/**
 * Records a visitor's cookie choice in the admin database (PUFBackend's /api/cookie-consents).
 * The browser posts here (same origin), so the backend URL never reaches the browser.
 */

const CHOICES = new Set(["accept_all", "reject_all", "custom"]);
const VISITOR_ID = /^[\w-]{8,64}$/;
const REQUEST_TIMEOUT_MS = 8000;

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false });
  }

  const { visitorId, choice, analytics, marketing, pageUrl } = body ?? {};
  if (typeof visitorId !== "string" || !VISITOR_ID.test(visitorId) || typeof choice !== "string" || !CHOICES.has(choice)) {
    return json(400, { ok: false });
  }

  const rawUrl = (process.env.PUF_BACKEND_URL || "http://localhost:4003").trim().replace(/\/+$/, "");
  const baseUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;

  try {
    const response = await fetch(`${baseUrl}/api/cookie-consents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Pass the visitor's browser along so the admin panel can show it
        "User-Agent": request.headers.get("user-agent") ?? "",
      },
      body: JSON.stringify({
        visitorId,
        choice,
        analytics: Boolean(analytics),
        marketing: Boolean(marketing),
        pageUrl: typeof pageUrl === "string" ? pageUrl.slice(0, 500) : null,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    });
    return json(response.ok ? 200 : 502, { ok: response.ok });
  } catch {
    // Logs only that it failed: no visitor details
    console.error("[cookie-consent] Backend save failed");
    return json(502, { ok: false });
  }
}
