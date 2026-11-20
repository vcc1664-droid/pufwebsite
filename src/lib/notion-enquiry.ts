// Server-only: saves website enquiries to the existing "PUF Website Enquiries" Notion database.
// Imported only by the /api/enquiry route handler, so the API key never reaches the browser.

const NOTION_VERSION = "2025-09-03";
const NOTION_API = "https://api.notion.com/v1";
/** Each Notion call is abandoned after this long. */
const REQUEST_TIMEOUT_MS = 8000;
/** Attempts for errors where Notion definitely did not create the page (rate limit, outage). */
const MAX_ATTEMPTS = 3;
/** Notion caps one rich-text segment at 2,000 characters. */
const RICH_TEXT_CHUNK = 2000;

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
};

export class NotionEnquiryError extends Error {}

function config() {
  const apiKey = process.env.NOTION_API_KEY?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID?.trim();
  if (!apiKey || !databaseId) {
    throw new NotionEnquiryError(
      "Missing Notion configuration: NOTION_API_KEY and NOTION_DATABASE_ID must be configured in environment variables.",
    );
  }
  return { apiKey, databaseId };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * One Notion request with a timeout. Retries only when Notion certainly did not act on it
 * (network failure before a response, 429, 502–504), so a retry can never create a duplicate.
 */
async function notionFetch(path: string, apiKey: string, init: RequestInit = {}): Promise<unknown> {
  for (let attempt = 1; ; attempt++) {
    let response: Response;
    try {
      response = await fetch(`${NOTION_API}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        cache: "no-store",
      });
    } catch (error) {
      // A timeout may mean Notion is still creating the page, so it is not retried.
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      if (!timedOut && attempt < MAX_ATTEMPTS) {
        await sleep(500 * attempt);
        continue;
      }
      throw new NotionEnquiryError(timedOut ? "Notion request timed out" : "Notion request failed");
    }

    if (response.ok) return response.json();

    const retryable = [429, 502, 503, 504].includes(response.status);
    if (retryable && attempt < MAX_ATTEMPTS) {
      const retryAfter = Number(response.headers.get("retry-after"));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000 * attempt);
      continue;
    }
    // Notion's error code (e.g. "validation_error") is safe to log; the body may echo user data.
    const body = (await response.json().catch(() => ({}))) as { code?: string };
    throw new NotionEnquiryError(`Notion responded ${response.status} ${body.code ?? ""}`.trim());
  }
}

// The data source ID is looked up once per server instance (databases hold data sources since
// Notion API 2025-09-03).
let dataSourceId: Promise<string> | null = null;

function getDataSourceId(apiKey: string, databaseId: string) {
  dataSourceId ??= notionFetch(`/databases/${databaseId}`, apiKey)
    .then((db) => {
      const id = (db as { data_sources?: { id: string }[] }).data_sources?.[0]?.id;
      if (!id) throw new NotionEnquiryError("Notion database has no data source");
      return id;
    })
    .catch((error) => {
      dataSourceId = null; // try the lookup again on the next enquiry
      throw error;
    });
  return dataSourceId;
}

const richText = (value: string) => ({
  rich_text: value
    ? (value.match(new RegExp(`[\\s\\S]{1,${RICH_TEXT_CHUNK}}`, "g")) ?? []).map((content) => ({
        type: "text",
        text: { content },
      }))
    : [],
});

/** The current date and time in India, as Notion's date `start` (local time, no offset). */
function submittedAtIndia() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((part) => [part.type, part.value]),
  );
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}`;
}

/** Adds the enquiry as a new row in the existing Notion database. */
export async function saveEnquiryToNotion(enquiry: Enquiry): Promise<void> {
  const { apiKey, databaseId } = config();
  const parentId = await getDataSourceId(apiKey, databaseId);

  // Property names match the existing database schema exactly.
  await notionFetch("/pages", apiKey, {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: parentId },
      properties: {
        Name: { title: [{ type: "text", text: { content: enquiry.name } }] },
        Email: { email: enquiry.email },
        Phone: { phone_number: enquiry.phone || null },
        "Company Name": richText(enquiry.company),
        Subject: richText(enquiry.subject),
        "Your Message": richText(enquiry.message),
        // Submission date and time, shown in Indian time
        Date: { date: { start: submittedAtIndia(), time_zone: "Asia/Kolkata" } },
      },
    }),
  });
}
