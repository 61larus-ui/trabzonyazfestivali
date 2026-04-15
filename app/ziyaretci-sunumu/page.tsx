"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePresentationSlides } from "@/lib/use-presentation-slides";

const SAHNE_LIST = [
  "3 Pop Sanatçısı",
  "3 Rap Sanatçısı",
  "3 Karadeniz Sanatçısı",
  "3 DJ Performans",
  "Stand Up Gösterisi",
  "Söyleşiler",
  "O Ses Trabzon Yarışması",
  "Dans Gösterileri",
] as const;

const COCUK_LIST = [
  "Palyaçolar",
  "Sihirbazlar",
  "Oyunlar",
  "Mini Basketbol",
  "Mini Futbol",
  "Çocuk Survivor",
] as const;

const YETISKIN_LIST = [
  "Mahalleler Arası Futbol Turnuvası",
  "Bilek Güreşi Turnuvası",
  "Balon Futbolu",
  "Ayak Tenisi",
  "Penaltı Yarışması",
  "Sokak Basketbolu",
] as const;

const FESTIVAL_ALAN_LIST = [
  "Sahne Alanı",
  "Yeme & İçme Noktaları",
  "Sosyal Buluşma Alanları",
  "Gece Atmosferi",
  "Festival Işıkları",
  "Gün Boyu Açık Deneyim",
] as const;

function VisitorReveal({
  active,
  emphasis = false,
  deferEntrance = true,
  className = "",
  children,
}: {
  active: boolean;
  emphasis?: boolean;
  deferEntrance?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const [show, setShow] = useState(() => !deferEntrance && active);

  useEffect(() => {
    if (!active) {
      setShow(false);
      return;
    }
    if (!deferEntrance) {
      setShow(true);
      return;
    }
    let r1 = 0;
    let r2 = 0;
    setShow(false);
    r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setShow(true));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [active, deferEntrance]);

  const timing = emphasis
    ? "duration-[380ms] delay-[90ms] md:delay-[110ms]"
    : "duration-[340ms] delay-[70ms] md:delay-[90ms]";
  const ease =
    "ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:scale-100 motion-reduce:transition-none";
  const motion = show
    ? "translate-y-0 scale-100 opacity-100"
    : "translate-y-3 scale-[0.98] opacity-0 max-md:translate-y-2 max-md:scale-[0.99]";

  return (
    <div
      className={`transition-[opacity,transform] ${timing} ${ease} max-md:duration-[320ms] max-md:delay-[55ms] ${motion} ${className}`}
    >
      {children}
    </div>
  );
}

function VisitorParallaxVisual({
  active,
  emphasis = false,
  children,
}: {
  active: boolean;
  emphasis?: boolean;
  children: ReactNode;
}) {
  const motion = active
    ? emphasis
      ? "md:scale-[1.042] md:-translate-y-[1.8%]"
      : "md:scale-[1.028] md:-translate-y-[1.1%]"
    : "md:scale-100 md:translate-y-0";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className={`relative h-full w-full origin-center transition-[transform,opacity] duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:scale-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none max-md:scale-100 max-md:translate-y-0 max-md:opacity-100 max-md:transition-none ${motion} ${active ? "opacity-100" : "opacity-[0.97] md:opacity-[0.98]"}`}
      >
        {children}
      </div>
    </div>
  );
}

const SPONSOR_FRAME_OUTER =
  "relative w-full max-w-[1400px] overflow-hidden rounded-xl bg-black ring-1 ring-white/[0.14] shadow-[0_20px_80px_-16px_rgba(0,0,0,0.88)] sm:rounded-2xl sm:shadow-[0_28px_100px_-18px_rgba(0,0,0,0.9)] lg:rounded-[1.25rem] lg:shadow-[0_32px_120px_-20px_rgba(0,0,0,0.9)]";

const HEADER_CENTER_TITLE_CLASS =
  "pointer-events-none mt-5 mb-9 w-full min-w-0 max-w-full text-center text-balance text-[clamp(0.5625rem,2.85vw+0.2rem,0.9375rem)] font-extrabold uppercase leading-[1.12] tracking-[0.02em] text-white max-sm:px-0.5 sm:mt-7 sm:mb-10 sm:whitespace-nowrap sm:text-2xl sm:leading-none sm:tracking-[0.035em] md:mb-11 md:text-3xl md:tracking-[0.045em] lg:mb-12 lg:text-5xl";

const HEADER_CENTER_TITLE_SHADOW = {
  textShadow:
    "0 0 9px rgba(255,255,255,0.1), 0 0 18px rgba(251,191,36,0.07), 0 2px 7px rgba(0,0,0,0.28)",
} as const;

const SLIDE_COUNT = 6;

const VISITOR_SLIDE_FOCUS =
  "transition-opacity duration-[360ms] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none";

const VISITOR_LIST_CLASS =
  "mt-0 list-none space-y-3 text-left text-sm leading-relaxed text-white/80 max-md:space-y-2 max-md:text-[0.8125rem] max-md:leading-snug sm:space-y-3.5 sm:text-[0.9375rem]";

const VISITOR_PANEL_BASE =
  "visitor-panel-scroll touch-pan-y w-full max-w-md min-h-0 rounded-xl border px-5 py-5 shadow-[0_18px_48px_-16px_rgba(0,0,0,0.65)] max-md:max-h-[min(66svh,34rem)] max-md:overflow-y-auto max-md:overscroll-y-contain max-md:px-4 max-md:pt-6 max-md:pb-8 sm:px-6 sm:py-6 md:max-w-[26rem] md:max-h-none md:overflow-visible";

const VISITOR_SLIDE_FRAME =
  "relative w-full overflow-hidden rounded-lg sm:rounded-xl aspect-[16/10] min-h-[17rem] max-md:aspect-auto max-md:min-h-[min(78svh,40rem)] sm:min-h-[20rem] md:aspect-auto md:min-h-[min(72svh,44rem)]";

export default function ZiyaretciSunumuPage() {
  const { activeSlide, slidesRef, scrollContainerRef, goToSlide } =
    usePresentationSlides(SLIDE_COUNT, true, { wheelStepSlides: true });

  const slideFocusOpacity = (index: number) =>
    activeSlide === index ? "opacity-100" : "opacity-[0.93]";

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 pb-1 sm:px-4 sm:pt-4 md:px-5 md:pt-5">
        <div className="mx-auto grid w-full max-w-[100vw] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1.5 sm:gap-3">
          <div className="flex shrink-0 justify-start">
            <Link
              href="/"
              className="pointer-events-auto flex min-h-[44px] min-w-[44px] max-w-[5.5rem] items-center justify-center rounded-sm border border-white/22 bg-black/48 px-2 py-2 text-center text-[8px] font-normal uppercase leading-tight tracking-[0.08em] text-white/65 transition-all duration-300 hover:border-white/42 hover:bg-black/55 hover:text-white/82 hover:shadow-[0_0_22px_-6px_rgba(255,255,255,0.28),0_0_40px_-12px_rgba(251,191,36,0.12)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:min-h-0 sm:min-w-0 sm:max-w-none sm:px-2 sm:py-1 sm:text-[9px] md:px-2.5 md:py-1.5 md:text-[10px]"
            >
              Sponsor Sunumu
            </Link>
          </div>
          <div className="flex w-full min-w-0 justify-center px-0.5 sm:px-1">
            {activeSlide > 0 ? (
              <VisitorReveal
                active
                deferEntrance
                className="flex w-full justify-center transition-opacity duration-[340ms] ease-out"
              >
                <p
                  className={HEADER_CENTER_TITLE_CLASS}
                  style={HEADER_CENTER_TITLE_SHADOW}
                >
                  TRABZON YAZ FEST 2026
                </p>
              </VisitorReveal>
            ) : null}
          </div>
          <div className="flex shrink-0 justify-end">
            <span
              aria-current="page"
              className="pointer-events-none flex min-h-[44px] min-w-[44px] max-w-[5.5rem] items-center justify-center rounded-sm border border-white/38 bg-black/52 px-2 py-2 text-center text-[8px] font-normal uppercase leading-tight tracking-[0.08em] text-white/85 shadow-[0_0_18px_-8px_rgba(255,255,255,0.15)] sm:min-h-0 sm:min-w-0 sm:max-w-none sm:px-2 sm:py-1 sm:text-[9px] sm:tracking-[0.1em] md:px-2.5 md:py-1.5 md:text-[10px]"
            >
              Ziyaretçi Sunumu
            </span>
          </div>
        </div>
      </header>

      <nav
        className="pointer-events-auto fixed right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1 sm:right-4 sm:gap-y-2 md:right-6 md:gap-y-2.5 lg:right-8 lg:gap-y-3"
        aria-label="Slayt gezinmesi"
      >
        {Array.from({ length: SLIDE_COUNT }, (_, index) => {
          const isActive = activeSlide === index;
          return (
            <button
              key={index}
              type="button"
              aria-label={`Slayta git ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => goToSlide(index)}
              className="flex h-11 w-10 shrink-0 items-center justify-center rounded-full sm:h-auto sm:w-auto sm:rounded-none sm:p-0"
            >
              <span
                className={
                  "block rounded-full transition-[width,height,opacity,box-shadow] duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/55 " +
                  (isActive
                    ? "h-2 w-5 bg-white opacity-100 shadow-[0_0_16px_-3px_rgba(255,255,255,0.4)] sm:h-2 sm:w-[1.35rem] md:h-2.5 md:w-6"
                    : "h-1.5 w-1.5 bg-white opacity-[0.22] hover:opacity-[0.42] hover:shadow-[0_0_14px_-4px_rgba(255,255,255,0.22)] sm:h-2 sm:w-2")
                }
              />
            </button>
          );
        })}
      </nav>

      <div
        className={
          "pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-[max(1rem,env(safe-area-inset-left))] right-[max(4.25rem,env(safe-area-inset-right)+3.25rem)] z-40 flex justify-between gap-2 text-[9px] font-normal uppercase tracking-[0.1em] text-white/48 sm:bottom-5 sm:left-6 sm:right-6 sm:text-xs md:left-8 md:right-8 md:text-[0.8125rem] lg:left-[30px] lg:right-[30px] lg:text-sm " +
          (activeSlide === SLIDE_COUNT - 1 ? "max-sm:hidden" : "")
        }
        aria-hidden
      >
        <span className="select-none">Trabzon Yaz Fest 2026</span>
        <span className="select-none">Ziyaretçi Sunumu</span>
      </div>

      <div
        ref={scrollContainerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll overscroll-y-contain bg-black text-white"
      >
        <section
          ref={(el) => {
            slidesRef.current[0] = el;
          }}
          className={`relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(0)}`}
          aria-label="Trabzon Yaz Fest 2026 açılış"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(1).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>
          <div className="relative min-h-0 flex-1 w-full">
            <VisitorParallaxVisual active={activeSlide === 0}>
              <Image
                src="/images/hero-festival.jpg"
                alt="Trabzon Yaz Fest 2026 festival görseli"
                fill
                priority
                className="object-cover object-center max-sm:object-[center_32%]"
                sizes="100vw"
              />
            </VisitorParallaxVisual>
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/36 to-black/52"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-10">
              <VisitorReveal
                active={activeSlide === 0}
                className="max-w-5xl text-center text-balance"
              >
                <h1
                  className="break-words text-balance text-[clamp(1.5rem,5.8vw,4.5rem)] font-bold uppercase leading-[1.1] tracking-[0.1em] text-white/[0.96] sm:tracking-[0.15em] md:tracking-[0.18em]"
                  style={{
                    textShadow:
                      "0 2px 20px rgba(0,0,0,0.55), 0 4px 36px rgba(0,0,0,0.35), 0 0 52px rgba(251, 191, 36, 0.18), 0 0 72px rgba(167, 139, 250, 0.14), 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  TRABZON YAZ FEST 2026
                </h1>
                <p
                  className="mt-7 text-[clamp(0.875rem,2.4vw,1.25rem)] font-semibold uppercase leading-snug tracking-[0.28em] text-white/82 sm:mt-8 md:mt-9 sm:tracking-[0.32em] md:tracking-[0.34em]"
                  style={{
                    textShadow:
                      "0 1px 10px rgba(0,0,0,0.4), 0 1px 20px rgba(0,0,0,0.25)",
                  }}
                >
                  10 • 11 • 12 TEMMUZ
                </p>
                <p className="mx-auto mt-2.5 max-w-xl break-words px-2 text-[clamp(0.6875rem,1.85vw,0.875rem)] font-normal leading-relaxed tracking-[0.05em] text-white/50 text-balance sm:mt-3 sm:px-2 sm:text-[clamp(0.75rem,1.7vw,0.9rem)] sm:tracking-[0.06em] md:text-[clamp(0.8125rem,1.5vw,0.9375rem)]">
                  Trabzon Ortahisar Akyazı Spor Kompleksi
                </p>
              </VisitorReveal>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[1] = el;
          }}
          className={`relative flex h-screen min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden max-md:overflow-visible border-t border-white/[0.06] bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(1)}`}
          aria-labelledby="sahne-deneyimi-title"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(2).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className={VISITOR_SLIDE_FRAME}>
                  <VisitorParallaxVisual active={activeSlide === 1}>
                    <Image
                      src="/images/stage-experience.jpg"
                      alt="Sahne deneyimi"
                      fill
                      className="object-cover object-center max-sm:object-[center_42%]"
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </VisitorParallaxVisual>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-black/14 sm:bg-gradient-to-r sm:from-black/36 sm:via-black/10 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex max-md:min-h-0 flex-col justify-end p-5 max-md:pt-16 max-md:pb-5 sm:p-6 md:items-start md:justify-center md:pl-10 md:pr-7 md:py-10 lg:pl-12 lg:pr-8 lg:py-11">
                    <VisitorReveal
                      active={activeSlide === 1}
                      className="w-full min-h-0 max-w-md md:pl-0"
                    >
                      <div
                        className={`${VISITOR_PANEL_BASE} border-white/[0.15] bg-black/44 md:bg-black/40`}
                      >
                        <h2 id="sahne-deneyimi-title" className="sr-only">
                          Sahne deneyimi
                        </h2>
                        <ul className={VISITOR_LIST_CLASS}>
                          {SAHNE_LIST.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span
                                className="mt-[0.35em] shrink-0 text-white/45"
                                aria-hidden
                              >
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </VisitorReveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[2] = el;
          }}
          className={`relative flex h-screen min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden max-md:overflow-visible border-t border-white/[0.06] bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(2)}`}
          aria-labelledby="cocuk-etkinlikleri-title"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(3).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className={VISITOR_SLIDE_FRAME}>
                  <VisitorParallaxVisual active={activeSlide === 2}>
                    <Image
                      src="/images/kids-area.jpg"
                      alt="Çocuk etkinlikleri alanı"
                      fill
                      className="object-cover object-center max-sm:object-[center_38%]"
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </VisitorParallaxVisual>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/16 sm:bg-gradient-to-br sm:from-black/42 sm:via-black/14 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex max-md:min-h-0 flex-col justify-end p-5 max-md:pt-16 max-md:pb-5 sm:p-6 md:items-start md:justify-start md:pl-10 md:pr-7 md:pb-9 md:pt-12 lg:pl-12 lg:pr-8 lg:pb-10 lg:pt-14">
                    <VisitorReveal
                      active={activeSlide === 2}
                      className="w-full min-h-0 max-w-md md:pl-0"
                    >
                      <div
                        className={`${VISITOR_PANEL_BASE} border-white/[0.14] bg-black/46 md:bg-black/42`}
                      >
                        <h2 id="cocuk-etkinlikleri-title" className="sr-only">
                          Çocuk etkinlikleri
                        </h2>
                        <ul className={VISITOR_LIST_CLASS}>
                          {COCUK_LIST.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span
                                className="mt-[0.35em] shrink-0 text-white/45"
                                aria-hidden
                              >
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </VisitorReveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[3] = el;
          }}
          className={`relative flex h-screen min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden max-md:overflow-visible border-t border-white/[0.06] bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(3)}`}
          aria-labelledby="yetiskin-etkinlikleri-title"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(4).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className={VISITOR_SLIDE_FRAME}>
                  <VisitorParallaxVisual active={activeSlide === 3}>
                    <Image
                      src="/images/adult-activities.jpg"
                      alt="Yetişkin etkinlikleri"
                      fill
                      className="object-cover object-center max-sm:object-[center_40%]"
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </VisitorParallaxVisual>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-black/16 sm:bg-gradient-to-bl sm:from-black/42 sm:via-black/14 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex max-md:min-h-0 flex-col justify-end p-5 max-md:pt-16 max-md:pb-5 sm:p-6 md:items-end md:justify-start md:pl-7 md:pr-10 md:pb-9 md:pt-12 lg:pl-8 lg:pr-12 lg:pb-10 lg:pt-12">
                    <VisitorReveal
                      active={activeSlide === 3}
                      className="w-full min-h-0 max-w-md md:pr-0"
                    >
                      <div
                        className={`${VISITOR_PANEL_BASE} border-white/[0.14] bg-black/46 md:bg-black/42`}
                      >
                        <h2 id="yetiskin-etkinlikleri-title" className="sr-only">
                          Yetişkin etkinlikleri
                        </h2>
                        <ul className={VISITOR_LIST_CLASS}>
                          {YETISKIN_LIST.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span
                                className="mt-[0.35em] shrink-0 text-white/45"
                                aria-hidden
                              >
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </VisitorReveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[4] = el;
          }}
          className={`relative flex h-screen min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden max-md:overflow-visible border-t border-white/[0.06] bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(4)}`}
          aria-labelledby="festival-alani-title"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(5).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className={VISITOR_SLIDE_FRAME}>
                  <VisitorParallaxVisual active={activeSlide === 4}>
                    <Image
                      src="/images/festival-area.jpg"
                      alt="Festival alanı"
                      fill
                      className="object-cover object-center max-sm:object-[center_36%]"
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </VisitorParallaxVisual>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/18 sm:bg-gradient-to-r sm:from-black/40 sm:via-black/12 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex max-md:min-h-0 flex-col justify-end p-5 max-md:pt-16 max-md:pb-5 sm:p-6 md:items-start md:justify-center md:pl-10 md:pr-7 md:py-10 lg:pl-12 lg:pr-8 lg:py-11">
                    <VisitorReveal
                      active={activeSlide === 4}
                      className="w-full min-h-0 max-w-md md:pl-0"
                    >
                      <div
                        className={`${VISITOR_PANEL_BASE} border-white/[0.14] bg-black/48 md:bg-black/44`}
                      >
                        <h2 id="festival-alani-title" className="sr-only">
                          Festival alanı
                        </h2>
                        <ul className={VISITOR_LIST_CLASS}>
                          {FESTIVAL_ALAN_LIST.map((item) => (
                            <li key={item} className="flex gap-2.5">
                              <span
                                className="mt-[0.35em] shrink-0 text-white/45"
                                aria-hidden
                              >
                                •
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </VisitorReveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[5] = el;
          }}
          className={`relative flex h-screen min-h-[100svh] w-full shrink-0 snap-start flex-col overflow-hidden max-md:overflow-visible border-t border-white/[0.06] bg-black ${VISITOR_SLIDE_FOCUS} ${slideFocusOpacity(5)}`}
          aria-labelledby="kapanis-cta-title"
        >
          <p className="pointer-events-none absolute left-[max(0.75rem,env(safe-area-inset-left))] top-[6.75rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(6).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 pb-10 pt-7 sm:px-6 sm:pb-12 sm:pt-9 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className={VISITOR_SLIDE_FRAME}>
                  <VisitorParallaxVisual active={activeSlide === 5} emphasis>
                    <Image
                      src="/images/festival-cta.jpg"
                      alt="Trabzon Yaz Fest 2026"
                      fill
                      className="object-cover object-[center_20%] max-sm:object-[center_28%]"
                      sizes="(max-width: 768px) 100vw, 1400px"
                    />
                  </VisitorParallaxVisual>
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent sm:from-black/12"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-end justify-center max-md:pt-16 max-md:pb-2 px-5 pb-12 sm:px-8 sm:pb-12 md:px-10 md:pb-14">
                    <VisitorReveal
                      active={activeSlide === 5}
                      emphasis
                      className="w-full max-w-xl px-1 text-center sm:px-0"
                    >
                      <div
                        id="kapanis-cta-title"
                        className="max-md:px-2 max-md:pb-4 space-y-3.5 leading-[1.72] sm:space-y-4"
                        style={{
                          textShadow:
                            "0 1px 12px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.35)",
                        }}
                      >
                        <p className="text-balance break-words text-[clamp(0.8125rem,2.2vw,1rem)] font-semibold uppercase tracking-[0.2em] text-white/94 sm:tracking-[0.26em] md:tracking-[0.3em]">
                          10 – 11 – 12 TEMMUZ 2026
                        </p>
                        <p className="text-balance break-words text-[clamp(0.5rem,1.35vw,0.75rem)] font-normal leading-[1.85] tracking-[0.04em] text-white/52">
                          Trabzon Ortahisar Akyazı Spor Kompleksi
                        </p>
                      </div>
                    </VisitorReveal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
