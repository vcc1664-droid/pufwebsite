// Server-only: saves "Tell us about your Building" enquiries to the Notion database.
// Imported only by the /api/building-enquiry route handler, so API keys never reach the browser.

const NOTION_VERSION = "2025-09-03";
const NOTION_API = "https://api.notion.com/v1";
/** Each Notion call is abandoned after this long. */
const REQUEST_TIMEOUT_MS = 8000;
/** Attempts for errors where Notion definitely did not create the page (rate limit, outage). */
const MAX_ATTEMPTS = 3;
/** Notion caps one rich-text segment at 2,000 characters. */
const RICH_TEXT_CHUNK = 2000;

export type BuildingEnquiry = {
  name: string;
  phone: string;
  location?: string;
  use?: string;
  area?: string;
  temperature?: string;
  action?: "quote" | "sample" | string;
};

export class NotionBuildingEnquiryError extends Error {}

function config() {
  const apiKey = process.env.NOTION_API_KEY_PUF?.trim();
  const databaseId = process.env.NOTION_DATABASE_ID_PUF?.trim();
  if (!apiKey || !databaseId) {
    throw new NotionBuildingEnquiryError(
      "Missing Notion PUF configuration: NOTION_API_KEY_PUF and NOTION_DATABASE_ID_PUF must be configured in environment variables.",
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
      const timedOut = error instanceof DOMException && error.name === "TimeoutError";
      if (!timedOut && attempt < MAX_ATTEMPTS) {
        await sleep(500 * attempt);
        continue;
      }
      throw new NotionBuildingEnquiryError(timedOut ? "Notion request timed out" : "Notion request failed");
    }

    if (response.ok) return response.json();

    const retryable = [429, 502, 503, 504].includes(response.status);
    if (retryable && attempt < MAX_ATTEMPTS) {
      const retryAfter = Number(response.headers.get("retry-after"));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1000 * attempt);
      continue;
    }
    const body = (await response.json().catch(() => ({}))) as { code?: string };
    throw new NotionBuildingEnquiryError(`Notion responded ${response.status} ${body.code ?? ""}`.trim());
  }
}

let dataSourceId: Promise<string> | null = null;

function getDataSourceId(apiKey: string, databaseId: string) {
  dataSourceId ??= notionFetch(`/databases/${databaseId}`, apiKey)
    .then((db) => {
      const id = (db as { data_sources?: { id: string }[] }).data_sources?.[0]?.id;
      if (!id) throw new NotionBuildingEnquiryError("Notion database has no data source");
      return id;
    })
    .catch((error) => {
      dataSourceId = null;
      throw error;
    });
  return dataSourceId;
}

const richText = (value?: string) => ({
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

/** Adds the building enquiry as a new row in the Notion database. */
export async function saveBuildingEnquiryToNotion(enquiry: BuildingEnquiry): Promise<void> {
  const { apiKey, databaseId } = config();
  const parentId = await getDataSourceId(apiKey, databaseId);

  // Combine use description with requested action (quote vs sample) if present
  const requestLabel = enquiry.action === "sample" ? "Request a sample" : "Request a quote";
  const useValue = enquiry.use
    ? `${enquiry.use} (${requestLabel})`
    : requestLabel;

  await notionFetch("/pages", apiKey, {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: parentId },
      properties: {
        Name: { title: [{ type: "text", text: { content: enquiry.name } }] },
        Phone: { phone_number: enquiry.phone || null },
        "Project Location": richText(enquiry.location),
        Use: richText(useValue),
        Approximatearea: richText(enquiry.area),
        "Operating Temperature": richText(enquiry.temperature),
        Date: { date: { start: submittedAtIndia(), time_zone: "Asia/Kolkata" } },
      },
    }),
  });
}

