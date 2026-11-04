"use client";

import { useEffect, useRef } from "react";

/** Edge-to-edge, full-viewport video directly below the hero. */
export function HeroImage() {
  const video = useRef<HTMLVideoElement>(null);

  // React leaves `muted` out of the server HTML, so the browser blocks autoplay; start it once mounted.
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <video
        ref={video}
        src="/Home/homePageVideo/Synergy_PUF_Website_finnllllll.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Synergy PUF showcase video"
        className="absolute inset-0 size-full object-cover"
      />
    </section>
  );
}
