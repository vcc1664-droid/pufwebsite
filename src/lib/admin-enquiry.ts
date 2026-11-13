// Server-only: also saves website enquiries to PUFBackend, so they show up in the admin panel
// (POST /api/quotes is the backend's public enquiry endpoint). Notion stays the main destination.

import type { Enquiry } from "@/lib/notion-enquiry";

/** The backend call is abandoned after this long. */
const REQUEST_TIMEOUT_MS = 8000;

export class AdminEnquiryError extends Error {}

/** Adds the enquiry to the admin panel's quotes list. */
export async function saveEnquiryToAdmin(enquiry: Enquiry): Promise<void> {
  const baseUrl = process.env.PUF_BACKEND_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) throw new AdminEnquiryError("PUF_BACKEND_URL is not configured");

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/api/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: enquiry.name,
        email: enquiry.email,
        // Phone is optional on the website but required by the backend
        phone: enquiry.phone || "-",
        company: enquiry.company,
        subject: enquiry.subject || "Website Enquiry",
        message: enquiry.message,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    const timedOut = error instanceof DOMException && error.name === "TimeoutError";
    throw new AdminEnquiryError(timedOut ? "Backend request timed out" : "Backend request failed");
  }

  if (!response.ok) throw new AdminEnquiryError(`Backend responded ${response.status}`);
}
