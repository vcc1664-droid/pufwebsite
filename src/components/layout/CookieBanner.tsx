"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { COOKIE_PREFS_SAVED, OPEN_COOKIE_SETTINGS, hasCookieChoice, savePrefs } from "./CookieSettings";

/**
 * Cookie consent card in the bottom-left corner of the screen. It shows on every page until the visitor makes
 * a choice (here or in the Cookie Settings dialog), which is then remembered for a year.
 */
export function CookieBanner() {
  // Hidden on the server and until we know there is no saved choice, so it never flashes for
  // visitors who have already chosen
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!hasCookieChoice());
    const onSaved = () => setShow(false);
    window.addEventListener(COOKIE_PREFS_SAVED, onSaved);
    return () => window.removeEventListener(COOKIE_PREFS_SAVED, onSaved);
  }, []);

  if (!show) return null;

  const button = "rounded-full px-5 py-2.5 font-ui text-[14px] leading-none font-semibold transition-colors duration-200";

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 z-[60] w-[calc(100vw-2rem)] max-w-[420px] animate-rise rounded-2xl border border-[#e6e6e6] bg-white sm:bottom-6 sm:left-6"
    >
      <div className="flex flex-col gap-4 p-5">
        <p className="font-ui text-[15px] leading-[1.55] text-[#3e3e3e]">
          We use cookies to improve your experience on our website.{" "}
          <Link href="/cookie-policy" className="text-black underline underline-offset-4 hover:text-brand">
            Cookie Policy
          </Link>
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
            className={cn(button, "text-black underline underline-offset-4 hover:text-brand")}
          >
            Cookie Settings
          </button>
          <button
            type="button"
            onClick={() => savePrefs({ analytics: false, marketing: false }, "reject_all")}
            className={cn(button, "border border-[#bdbdbd] hover:border-black")}
          >
            Reject All
          </button>
          <button
            type="button"
            onClick={() => savePrefs({ analytics: true, marketing: true }, "accept_all")}
            className={cn(button, "bg-brand text-white hover:bg-black")}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
