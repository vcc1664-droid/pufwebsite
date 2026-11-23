import { saveEnquiryToAdmin } from "@/lib/admin-enquiry";
import { attachFileToNotionPage, type Enquiry, saveEnquiryToNotion } from "@/lib/notion-enquiry";

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
/** Optional drawing upload: size cap and accepted file types. */
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const FILE_TYPES = /\.(pdf|jpe?g|png|dwg|webp)$/i;
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

/** Reads the request: JSON, or multipart form data when a drawing is attached. */
async function readBody(
  request: Request,
): Promise<{ body?: Record<string, unknown>; file?: File; error?: Response }> {
  const type = request.headers.get("content-type") ?? "";

  if (type.includes("multipart/form-data")) {
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > MAX_FILE_BYTES + MAX_BODY_BYTES) {
      return { error: json(413, { ok: false, error: "The file is too large. Please keep it under 10 MB." }) };
    }
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return { error: json(400, { ok: false, error: "Invalid request." }) };
    }
    const body: Record<string, unknown> = {};
    let file: File | undefined;
    for (const [key, value] of form) {
      if (typeof value === "string") body[key] = value;
      else if (key === "drawing" && value.size > 0) file = value;
    }
    if (file) {
      if (file.size > MAX_FILE_BYTES) {
        return { error: json(413, { ok: false, error: "The file is too large. Please keep it under 10 MB." }) };
      }
      if (!FILE_TYPES.test(file.name)) {
        return { error: json(422, { ok: false, error: "Please upload a PDF, JPG, PNG or DWG file." }) };
      }
    }
    return { body, file };
  }

  if (!type.includes("application/json")) return { error: json(415, { ok: false, error: "Unsupported request." }) };
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return { error: json(413, { ok: false, error: "Your message is too long." }) };
  try {
    const body = JSON.parse(raw);
    if (!body || typeof body !== "object") throw new Error();
    return { body };
  } catch {
    return { error: json(400, { ok: false, error: "Invalid request." }) };
  }
}

/** Saves a contact-form enquiry to the Notion enquiries database. */
export async function POST(request: Request) {
  const { body, file, error: readError } = await readBody(request);
  if (!body) return readError ?? json(400, { ok: false, error: "Invalid request." });

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

  const location = typeof body.location === "string" ? body.location.trim().slice(0, 255) : "";
  const panel = typeof body.panel === "string" ? body.panel.trim().slice(0, 255) : "";

  let drawingBase64: string | undefined;
  let drawingName: string | undefined;

  if (file) {
    drawingName = file.name;
    try {
      const buffer = Buffer.from(await file.arrayBuffer());
      drawingBase64 = buffer.toString("base64");

      // Also save locally in public/uploads if accessible (non-serverless)
      if (!process.env.VERCEL) {
        try {
          const fs = await import("node:fs/promises");
          const path = await import("node:path");
          const uploadsDir = path.resolve(process.cwd(), "public/uploads");
          await fs.mkdir(uploadsDir, { recursive: true });
          const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
          await fs.writeFile(path.join(uploadsDir, safeName), buffer);
        } catch {
          // Ignored on serverless
        }
      }
    } catch (fileErr) {
      console.warn("[enquiry] Local file write warning:", fileErr);
    }
  }

  const adminPayload = {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    company: enquiry.company,
    location,
    panel: panel || enquiry.subject,
    subject: panel || enquiry.subject,
    message: enquiry.message,
    drawingName,
    drawingBase64,
  };

  // Primary: save directly to Admin Panel backend database
  const adminSavePromise = saveEnquiryToAdmin(adminPayload);

  // Secondary: Notion database (if configured)
  const notionPromise = saveEnquiryToNotion(enquiry)
    .then(async (pageId) => {
      if (!file) return;
      await attachFileToNotionPage(pageId, file).catch((err) => {
        console.error("[enquiry] Drawing upload failed to Notion:", err);
      });
    })
    .catch((err) => {
      console.warn("[enquiry] Notion save skipped or failed:", err instanceof Error ? err.message : err);
    });

  recent.set(submissionId, { at: now, pending: adminSavePromise });

  try {
    await adminSavePromise;
    recent.set(submissionId, { at: now });
    return json(200, { ok: true });
  } catch (adminErr) {
    console.error("[enquiry] Admin panel save failed:", adminErr instanceof Error ? adminErr.message : adminErr);
    // Fallback: If Notion succeeded, still return ok
    try {
      await notionPromise;
      recent.set(submissionId, { at: now });
      return json(200, { ok: true });
    } catch {
      recent.delete(submissionId);
      return json(502, { ok: false, error: "We couldn't send your enquiry right now. Please try again." });
    }
  }
}
