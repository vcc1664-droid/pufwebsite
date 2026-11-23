// Server-only: saves website enquiries to PUFBackend, so they show up in the admin panel.

export interface AdminEnquiry {
  name: string;
  email: string;
  phone: string;
  company?: string;
  location?: string;
  panel?: string;
  subject?: string;
  message?: string;
  drawingName?: string;
  drawingUrl?: string;
  drawingBase64?: string;
}

/** The backend call is abandoned after this long. */
const REQUEST_TIMEOUT_MS = 15000;

export class AdminEnquiryError extends Error {}

/** Adds the enquiry to the admin panel's quotes list. */
export async function saveEnquiryToAdmin(enquiry: AdminEnquiry): Promise<any> {
  const baseUrl = process.env.PUF_BACKEND_URL?.trim().replace(/\/+$/, "") || "http://localhost:4003";

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone || "-",
        company: enquiry.company || "",
        location: enquiry.location || "",
        product: enquiry.panel || enquiry.subject || "PUF Panels",
        message: enquiry.message || "",
        drawing_name: enquiry.drawingName || null,
        drawing_url: enquiry.drawingUrl || null,
        drawing_base64: enquiry.drawingBase64 || null,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    throw new AdminEnquiryError(timedOut ? "Backend request timed out" : "Backend request failed");
  }

  if (!response.ok) {
    const errData = (await response.json().catch(() => ({}))) as { error?: string };
    throw new AdminEnquiryError(`Backend responded ${response.status}: ${errData?.error || response.statusText}`);
  }

  return response.json();
}
