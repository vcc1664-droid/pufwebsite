"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type Prefs = { analytics: boolean; marketing: boolean };

/** Window events: open the preferences dialog from anywhere; a choice has been saved. */
export const OPEN_COOKIE_SETTINGS = "puf:open-cookie-settings";
export const COOKIE_PREFS_SAVED = "puf:cookie-prefs-saved";

/** Browser cookie that remembers the visitor's choice for a year. */
const COOKIE = "puf_cookie_prefs";
const ONE_YEAR = 60 * 60 * 24 * 365;

/** True once the visitor has made a choice (any choice) about cookies. */
export function hasCookieChoice() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE}=`));
}

function readPrefs(): Prefs {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (raw) {
    try {
      const saved = JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1)));
      return { analytics: Boolean(saved.analytics), marketing: Boolean(saved.marketing) };
    } catch {
      // Unreadable cookie: fall through to the defaults
    }
  }
  return { analytics: true, marketing: true };
}

/** Which button the visitor used; recorded with the choice in the admin database. */
export type ConsentChoice = "accept_all" | "reject_all" | "custom";

/** Anonymous id kept in the same cookie, so the admin panel can tell repeat choices by one visitor. */
function visitorId(): string {
  const raw = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE}=`));
  if (raw) {
    try {
      const saved = JSON.parse(decodeURIComponent(raw.slice(COOKIE.length + 1)));
      if (typeof saved.id === "string" && saved.id) return saved.id;
    } catch {
      // Unreadable cookie: make a new id
    }
  }
  return crypto.randomUUID();
}

export function savePrefs(prefs: Prefs, choice: ConsentChoice) {
  const id = visitorId();
  // Only this small cookie stays in the browser (so the banner doesn't return on every page);
  // the choice itself is stored in the admin database
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify({ ...prefs, id }))}; max-age=${ONE_YEAR}; path=/; SameSite=Lax`;
  void fetch("/api/cookie-consent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId: id, choice, ...prefs, pageUrl: window.location.pathname }),
    keepalive: true,
  }).catch(() => {});
  // Tell Google Tag Manager (Consent Mode) what the visitor allowed
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.marketing ? "granted" : "denied",
    ad_user_data: prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(COOKIE_PREFS_SAVED));
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200",
        checked ? "bg-brand" : "bg-[#cfcfcf]",
      )}
    >
      <span
        className={cn(
          "absolute top-1 left-1 size-5 rounded-full bg-white shadow transition-transform duration-200",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

/** The footer's "Cookie Settings" link: opens the cookie preferences dialog. */
export function CookieSettings({ className, label }: { className?: string; label: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [prefs, setPrefs] = useState<Prefs>({ analytics: true, marketing: true });

  const open = () => {
    setPrefs(readPrefs());
    dialog.current?.showModal();
  };

  // The cookie banner (and anything else) can open this dialog too
  useEffect(() => {
    const onOpen = () => {
      setPrefs(readPrefs());
      dialog.current?.showModal();
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, onOpen);
  }, []);
  const finish = (next: Prefs, choice: ConsentChoice) => {
    savePrefs(next, choice);
    setPrefs(next);
    dialog.current?.close();
  };

  const rows: { key: keyof Prefs | "necessary"; title: string; body: string }[] = [
    {
      key: "necessary",
      title: "Necessary Cookies",
      body: "Required for the website to work, such as remembering your cookie choice. These are always active.",
    },
    {
      key: "analytics",
      title: "Analytics Cookies",
      body: "Help us understand how visitors use the website (for example Google Analytics) so we can improve it.",
    },
    {
      key: "marketing",
      title: "Marketing Cookies",
      body: "Used to measure and personalise advertising and campaigns across other websites.",
    },
  ];

  const button =
    "rounded-full px-6 py-3 font-ui text-[15px] leading-none font-semibold transition-colors duration-200";

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {label}
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="cookie-settings-title"
        // Clicks on the backdrop land on the dialog itself; close then
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        // Lets the wheel scroll the dialog instead of the smooth-scrolled page behind it
        data-lenis-prevent
        className="m-auto max-h-[92svh] w-[min(92vw,680px)] max-w-none overflow-y-auto rounded-2xl bg-white p-0 text-black backdrop:bg-black/60 open:animate-rise"
      >
        <div className="relative px-6 pt-8 pb-6 sm:px-12 sm:pt-11 sm:pb-10">
          <button
            type="button"
            aria-label="Close cookie settings"
            onClick={() => dialog.current?.close()}
            className="absolute top-5 right-5 grid size-10 place-items-center rounded-full transition-colors duration-200 hover:bg-black/5 sm:top-7 sm:right-7"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <p className="font-ui text-[13px] tracking-[0.25em] text-[#555] uppercase">Cookies</p>
          <h2 id="cookie-settings-title" className="mt-3 font-sans text-[28px] leading-tight font-semibold">
            Cookie Preferences
          </h2>
          <p className="mt-3 font-ui text-[17px] leading-[1.6] text-[#3e3e3e]">
            Choose which cookies we may use. You can change this at any time from &ldquo;Cookie Settings&rdquo;
            in the footer.{" "}
            <Link href="/cookie-policy" className="text-black underline underline-offset-4 hover:text-brand">
              Learn more
            </Link>
          </p>

          <ul className="mt-6 border-t border-[#e6e6e6]">
            {rows.map((row) => (
              <li key={row.key} className="flex items-start justify-between gap-6 border-b border-[#e6e6e6] py-5">
                <div>
                  <h3 className="font-ui text-[17px] font-semibold">{row.title}</h3>
                  <p className="mt-1.5 font-ui text-[15px] leading-[1.6] text-[#555]">{row.body}</p>
                </div>
                {row.key === "necessary" ? (
                  <span className="shrink-0 rounded-full bg-brand/10 px-4 py-1.5 font-ui text-[14px] font-semibold text-brand">
                    Always active
                  </span>
                ) : (
                  <Toggle
                    label={row.title}
                    checked={prefs[row.key]}
                    onChange={(v) => setPrefs((p) => ({ ...p, [row.key]: v }))}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => finish({ analytics: false, marketing: false }, "reject_all")}
              className={cn(button, "border border-[#bdbdbd] hover:border-black")}
            >
              Reject All
            </button>
            <button
              type="button"
              onClick={() => finish({ analytics: true, marketing: true }, "accept_all")}
              className={cn(button, "border border-[#bdbdbd] hover:border-black")}
            >
              Accept All
            </button>
            <button type="button" onClick={() => finish(prefs, "custom")} className={cn(button, "bg-brand text-white hover:bg-black")}>
              Save My Preferences
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
