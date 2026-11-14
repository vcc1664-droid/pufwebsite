"use client";

import Image, { type StaticImageData } from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { PerformanceRow } from "./PanelRange";

type SpecsDialogProps = {
  /** Panel name shown as the heading. */
  name: string;
  rows: PerformanceRow[];
  /** Panel render under the heading; the box stays empty without one. */
  image?: StaticImageData;
};

/**
 * Full technical spec sheet for one panel, opened as a centred modal (native <dialog>, so Esc,
 * focus trapping and the backdrop come for free). The photo area on the left is an empty box
 * until the panel render is supplied.
 */
/* Sizes (lg+) are cqw of the dialog width, measured from the design. */
export const SpecsDialog = forwardRef<HTMLDialogElement, SpecsDialogProps>(function SpecsDialog(
  { name, rows, image },
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => dialog.current as HTMLDialogElement);

  // From lg up the sheet always fits one screen: if it is still taller than the dialog allows
  // (short laptop screens), it is zoomed down evenly, so it looks the same, only smaller.
  useEffect(() => {
    const el = dialog.current;
    const inner = sheet.current;
    if (!el || !inner) return;
    const desktop = window.matchMedia("(min-width: 64rem)");

    const fit = () => {
      inner.style.zoom = "";
      if (!el.open || !desktop.matches) return;
      const room = window.innerHeight * 0.92;
      // Zoom also changes the width that cqw sizes are measured from, so one step can undershoot;
      // a few refinements settle it.
      let zoom = 1;
      for (let i = 0; i < 4; i++) {
        const height = inner.getBoundingClientRect().height;
        if (height <= room) break;
        zoom *= room / height;
        inner.style.zoom = String(zoom);
      }
    };

    // Fires when the dialog opens (its size goes from 0) and whenever the screen size changes
    const observer = new ResizeObserver(fit);
    observer.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-label={`${name} specifications`}
      // Clicks on the backdrop land on the dialog itself; close then
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      // Lets the wheel scroll the dialog instead of the smooth-scrolled page behind it
      data-lenis-prevent
      // Width is also capped by the screen height: every size inside scales with the width, so the
      // whole sheet fits on one screen without scrolling (from lg up).
      className="m-auto max-h-[92svh] w-[min(94vw,1500px)] max-w-none overflow-y-auto lg:w-[min(94vw,1500px,122svh)] rounded-[max(12px,1cqw)] bg-white p-0 text-black backdrop:bg-black/60 open:animate-rise"
    >
      <div
        ref={sheet}
        className="@container relative"
      >
        <form method="dialog">
          <button
            type="submit"
            aria-label="Close specifications"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full text-black transition-colors duration-200 hover:bg-black/5 lg:top-[2cqw] lg:right-[1.6cqw] lg:size-[max(40px,2.6cqw)]"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="size-[55%]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </form>

        <div className="grid gap-8 px-5 pt-16 pb-8 lg:grid-cols-[1fr_40.8cqw] lg:gap-[3cqw] lg:pt-[1cqw] lg:pr-[5cqw] lg:pb-[4cqw] lg:pl-[2.7cqw]">
          <div>
            <h2 className="text-[max(28px,3.45cqw)] leading-tight font-bold tracking-[-0.02em] lg:pl-[2.6cqw]">
              {name}
            </h2>
            {/* Panel render, or an empty box until one is supplied */}
            <div
              aria-hidden={!image}
              className="relative mt-8 aspect-[1190/650] overflow-hidden rounded-[max(10px,1cqw)] border border-[#e4e0ea] bg-[#f4f1f7] lg:mt-[6cqw]"
            >
              {image && (
                <Image
                  src={image}
                  alt={`${name} render`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 94vw"
                  className="object-contain"
                />
              )}
            </div>
          </div>

          <table className="w-full border-separate border-spacing-0 self-start overflow-hidden rounded-[max(10px,1cqw)] border border-[#d9d4e0] font-ui text-[max(14px,1.1cqw)] leading-[1.45] lg:text-[max(11px,1.1cqw)]">
            <thead>
              <tr className="bg-brand text-center text-white">
                <th scope="col" className="w-[52%] px-4 py-4 font-bold tracking-[0.02em] uppercase lg:px-[1.25cqw] lg:py-[1.7cqw]">
                  Characteristics
                </th>
                <th scope="col" className="px-4 py-4 font-bold tracking-[0.02em] uppercase lg:px-[1.25cqw] lg:py-[1.7cqw]">
                  Specifications
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-[#f4f1f7]" : "bg-white"}>
                  <th
                    scope="row"
                    className="border-t border-r border-[#d9d4e0] px-4 py-3 text-center align-middle font-normal lg:px-[1.25cqw] lg:py-[1.35cqw]"
                  >
                    {row.label}
                  </th>
                  <td className="border-t border-[#d9d4e0] px-4 py-3 text-center align-middle lg:px-[1.25cqw] lg:py-[1.35cqw]">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </dialog>
  );
});
