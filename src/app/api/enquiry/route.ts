import { saveEnquiryToAdmin } from "@/lib/admin-enquiry";
import { type Enquiry, saveEnquiryToNotion } from "@/lib/notion-enquiry";

/** Field limits; the message allows a long project brief. */
const LIMITS: Record<keyof Enquiry, number> = {
  name: 200,
  email: 254,
  phone: 40,
  company: 200,
  subject: 300,
  message: 5000,
};
const MAX_BODY_BYTES = 20_000;
/** How long a submission ID is remembered to drop repeated submissions of the same enquiry. */
const DEDUPE_MS = 10 * 60 * 1000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s()./-]*$/;
const SUBMISSION_ID = /^[\w-]{8,64}$/;

// Recent submission IDs (per server instance). A repeat of one already saved, or still being
// saved, is answered without writing a second row.
const recent = new Map<string, { at: number; pending?: Promise<void> }>();

function forget(now: number) {
  for (const [id, entry] of recent) if (now - entry.at > DEDUPE_MS) recent.delete(id);
}

/** Trims, strips control characters (keeping line breaks in the message) and caps the length. */
function clean(value: unknown, field: keyof Enquiry): string {
  if (typeof value !== "string") return "";
  const keepNewlines = field === "message";
  const stripped = value.replace(keepNewlines ? /[\u0000-\u0009\u000b-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, " ");
  return stripped.trim().slice(0, LIMITS[field]);
}

function validate(body: Record<string, unknown>): { enquiry?: Enquiry; error?: string } {
  const enquiry = Object.fromEntries(
    (Object.keys(LIMITS) as (keyof Enquiry)[]).map((field) => [field, clean(body[field], field)]),
  ) as Enquiry;

  if (!enquiry.name) return { error: "Please enter your name." };
  if (!EMAIL.test(enquiry.email)) return { error: "Please enter a valid email address." };
  if (enquiry.phone && !PHONE.test(enquiry.phone)) return { error: "Please enter a valid phone number." };
  if (!enquiry.message) return { error: "Please enter your message." };
  return { enquiry };
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

/** Saves a contact-form enquiry to the Notion enquiries database. */
export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(415, { ok: false, error: "Unsupported request." });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "Your message is too long." });

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
  if (!SUBMISSION_ID.test(submissionId)) return json(400, { ok: false, error: "Invalid request." });

  const now = Date.now();
  forget(now);
  const seen = recent.get(submissionId);
  if (seen) {
    // Same enquiry sent again (double click, retry): wait for the first save instead of adding a row.
    try {
      await seen.pending;
      return json(200, { ok: true, duplicate: true });
    } catch {
      recent.delete(submissionId);
    }
  }

  // Also copy it to the admin panel. Runs alongside Notion; a failure here is only logged and
  // never changes the visitor's result (Notion still decides that, as before).
  const adminSave = saveEnquiryToAdmin(enquiry).catch((err) => {
    console.error("[enquiry] Admin panel save failed:", err instanceof Error ? err.message : "unknown error");
  });

  const pending = saveEnquiryToNotion(enquiry);
  recent.set(submissionId, { at: now, pending });
  try {
    await Promise.all([pending, adminSave]);
    recent.set(submissionId, { at: now });
    return json(200, { ok: true });
  } catch (err) {
    await adminSave;
    recent.delete(submissionId);
    // Logs only the failure reason: no API key and no visitor details.
    console.error("[enquiry] Notion save failed:", err instanceof Error ? err.message : "unknown error");
    return json(502, { ok: false, error: "We couldn't send your enquiry right now." });
  }
}
