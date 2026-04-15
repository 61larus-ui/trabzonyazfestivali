"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sunum kaydırma / snap / aktif slayt mantığı (sponsor ana sayfa ile aynı davranış).
 */
export function usePresentationSlides(
  slideCount: number,
  keyboardEnabled = true,
) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slidesRef = useRef<(HTMLElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeSlideRef = useRef(activeSlide);
  const keyboardEnabledRef = useRef(keyboardEnabled);

  activeSlideRef.current = activeSlide;
  keyboardEnabledRef.current = keyboardEnabled;

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    const ratios = Array.from({ length: slideCount }, () => 0);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const idx = slidesRef.current.indexOf(entry.target as HTMLElement);
          if (idx >= 0) {
            ratios[idx] = entry.intersectionRatio;
          }
        }
        let best = 0;
        for (let i = 1; i < slideCount; i++) {
          if (ratios[i] > ratios[best]) best = i;
        }
        if (ratios[best] >= 0.6) {
          setActiveSlide(best);
        }
      },
      { root, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
    );

    slidesRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [slideCount]);

  const goToSlide = useCallback(
    (index: number) => {
      const i = Math.max(0, Math.min(slideCount - 1, index));
      setActiveSlide(i);
      slidesRef.current[i]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [slideCount],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!keyboardEnabledRef.current) return;

      const t = e.target;
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t instanceof HTMLSelectElement ||
        (t instanceof HTMLElement && t.isContentEditable)
      ) {
        return;
      }

      const current = activeSlideRef.current;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          goToSlide(current + 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goToSlide(current - 1);
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(slideCount - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToSlide, slideCount]);

  return {
    activeSlide,
    slidesRef,
    scrollContainerRef,
    goToSlide,
  };
}
