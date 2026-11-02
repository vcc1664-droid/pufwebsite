"use client";

import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { Suspense, useEffect, useSyncExternalStore, type ReactNode } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Jumps back to the top on every route change, so Lenis doesn't animate from the old position. */
function ResetOnNavigate() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/** Site-wide inertia scrolling; off for visitors who prefer reduced motion. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  // Server render assumes reduced motion, so the first paint never depends on Lenis.
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );

  if (reducedMotion) return children;

  return (
    <ReactLenis root options={{ lerp: 0.1, anchors: true, allowNestedScroll: true }}>
      {/* usePathname may suspend under cacheComponents */}
      <Suspense fallback={null}>
        <ResetOnNavigate />
      </Suspense>
      {children}
    </ReactLenis>
  );
}
