import { type BuildingEnquiry, saveBuildingEnquiryToNotion } from "@/lib/notion-building-enquiry";

const LIMITS: Record<keyof BuildingEnquiry, number> = {
  name: 200,
  phone: 40,
  location: 200,
  use: 300,
  area: 100,
  temperature: 100,
  action: 40,
};
const MAX_BODY_BYTES = 20_000;
const DEDUPE_MS = 10 * 60 * 1000;

const PHONE = /^[+\d][\d\s()./-]*$/;
const SUBMISSION_ID = /^[\w-]{8,64}$/;

const recent = new Map<string, { at: number; pending?: Promise<void> }>();

function forget(now: number) {
  for (const [id, entry] of recent) if (now - entry.at > DEDUPE_MS) recent.delete(id);
}

function clean(value: unknown, field: keyof BuildingEnquiry): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, LIMITS[field]);
}

function validate(body: Record<string, unknown>): { enquiry?: BuildingEnquiry; error?: string } {
  const enquiry = Object.fromEntries(
    (Object.keys(LIMITS) as (keyof BuildingEnquiry)[]).map((field) => [field, clean(body[field], field)]),
  ) as BuildingEnquiry;

  if (!enquiry.name) return { error: "Please enter your name." };
  if (!enquiry.phone) return { error: "Please enter your phone number." };
  if (!PHONE.test(enquiry.phone)) return { error: "Please enter a valid phone number." };

  return { enquiry };
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

async function saveToAdmin(enquiry: BuildingEnquiry): Promise<void> {
  const rawUrl = process.env.PUF_BACKEND_URL?.trim().replace(/\/+$/, "");
  if (!rawUrl) return;
  const baseUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;

  const details = [
    `Project Location: ${enquiry.location || "-"}`,
    `Use: ${enquiry.use || "-"}`,
    `Approximate Area: ${enquiry.area || "-"}`,
    `Operating Temperature: ${enquiry.temperature || "-"}`,
    `Request Type: ${enquiry.action === "sample" ? "Request a sample" : "Request a quote"}`,
  ].join("\n");

  await fetch(`${baseUrl}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: enquiry.name,
      email: "not-provided@synergypuf.com",
      phone: enquiry.phone || "-",
      company: enquiry.location || "-",
      subject: enquiry.action === "sample" ? "Building Sample Request" : "Building Quote Request",
      message: details,
    }),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  }).catch((err) => {
    console.error("[building-enquiry] Admin panel save failed:", err instanceof Error ? err.message : "unknown error");
  });
}

/** Saves a "Tell us about your Building" enquiry to the Notion database. */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, error: "Unsupported request." });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Your submission is too long." });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Invalid request." });
  }
  if (!body || typeof body !== "object") return json(400, { ok: false, error: "Invalid request." });

  const { enquiry, error } = validate(body);
  if (!enquiry) return json(422, { ok: false, error });

  const submissionId = typeof body.submissionId === "string" ? body.submissionId : "";
  if (submissionId && !SUBMISSION_ID.test(submissionId)) {
    return json(400, { ok: false, error: "Invalid request." });
  }

  const now = Date.now();
  forget(now);

  if (submissionId) {
    const seen = recent.get(submissionId);
    if (seen) {
      try {
        await seen.pending;
        return json(200, { ok: true, duplicate: true });
      } catch {
        recent.delete(submissionId);
      }
    }
  }

  // Admin panel save runs in background without blocking the user response
  saveToAdmin(enquiry);

  const pending = saveBuildingEnquiryToNotion(enquiry);
  if (submissionId) {
    recent.set(submissionId, { at: now, pending });
  }

  try {
    await pending;
    if (submissionId) recent.set(submissionId, { at: now });
    return json(200, { ok: true });
  } catch (err) {
    console.error("[building-enquiry] Notion save failed:", err instanceof Error ? err.message : "unknown error");
    return json(502, {
      ok: false,
      error: "We could not save your submission right now. Please try again or contact us directly.",
    });
  }
}

