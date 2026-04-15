"use client";

import Link from "next/link";
import Image from "next/image";
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

const SPONSOR_FRAME_OUTER =
  "relative w-full max-w-[1400px] overflow-hidden rounded-xl bg-black ring-1 ring-white/[0.14] shadow-[0_20px_80px_-16px_rgba(0,0,0,0.88)] sm:rounded-2xl sm:shadow-[0_28px_100px_-18px_rgba(0,0,0,0.9)] lg:rounded-[1.25rem] lg:shadow-[0_32px_120px_-20px_rgba(0,0,0,0.9)]";

const HEADER_CENTER_TITLE_CLASS =
  "pointer-events-none mt-6 mb-6 w-full text-center whitespace-nowrap text-2xl font-extrabold uppercase leading-none tracking-[0.035em] text-white sm:mt-8 sm:mb-8 md:text-3xl md:tracking-[0.045em] lg:text-5xl";

const HEADER_CENTER_TITLE_SHADOW = {
  textShadow:
    "0 0 9px rgba(255,255,255,0.1), 0 0 18px rgba(251,191,36,0.07), 0 2px 7px rgba(0,0,0,0.28)",
} as const;

const SLIDE_COUNT = 6;

export default function ZiyaretciSunumuPage() {
  const { activeSlide, slidesRef, scrollContainerRef, goToSlide } =
    usePresentationSlides(SLIDE_COUNT);

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-2 pt-3 sm:px-4 sm:pt-4 md:px-5 md:pt-5">
        <div className="mx-auto grid w-full max-w-[100vw] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-3">
          <div className="flex shrink-0 justify-start">
            <Link
              href="/"
              className="pointer-events-auto rounded-sm border border-white/22 bg-black/30 px-1.5 py-1 text-center text-[8px] font-normal uppercase leading-tight tracking-[0.1em] text-white/65 backdrop-blur-[8px] transition-all duration-300 hover:border-white/42 hover:text-white/82 hover:shadow-[0_0_22px_-6px_rgba(255,255,255,0.28),0_0_40px_-12px_rgba(251,191,36,0.12)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:px-2 sm:py-1 sm:text-[9px] md:px-2.5 md:py-1.5 md:text-[10px]"
            >
              Sponsor Sunumu
            </Link>
          </div>
          <div className="flex w-full min-w-0 justify-center px-1">
            {activeSlide > 0 ? (
              <p
                className={HEADER_CENTER_TITLE_CLASS}
                style={HEADER_CENTER_TITLE_SHADOW}
              >
                TRABZON YAZ FEST 2026
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 justify-end">
            <span
              aria-current="page"
              className="pointer-events-none rounded-sm border border-white/38 bg-black/40 px-1.5 py-1 text-center text-[8px] font-normal uppercase leading-tight tracking-[0.1em] text-white/85 shadow-[0_0_18px_-8px_rgba(255,255,255,0.15)] backdrop-blur-[8px] sm:px-2 sm:py-1 sm:text-[9px] md:px-2.5 md:py-1.5 md:text-[10px]"
            >
              Ziyaretçi Sunumu
            </span>
          </div>
        </div>
      </header>

      <nav
        className="pointer-events-auto fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-y-1.5 sm:flex sm:right-4 sm:gap-y-2 md:right-6 md:gap-y-2.5 lg:right-8 lg:gap-y-3"
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
              className={
                "h-1.5 w-1.5 shrink-0 rounded-full transition-[transform,opacity] duration-200 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:h-2 sm:w-2 lg:h-2.5 lg:w-2.5 " +
                (isActive
                  ? "scale-125 bg-white opacity-100"
                  : "scale-100 bg-white opacity-30 hover:opacity-50")
              }
            />
          );
        })}
      </nav>

      <div
        className={
          "pointer-events-none fixed bottom-4 left-4 right-4 z-50 flex justify-between text-[9px] font-normal uppercase tracking-[0.1em] text-white/48 sm:bottom-5 sm:left-6 sm:right-6 sm:text-xs md:left-8 md:right-8 md:text-[0.8125rem] lg:left-[30px] lg:right-[30px] lg:text-sm " +
          (activeSlide === SLIDE_COUNT - 1 ? "max-sm:hidden" : "")
        }
        aria-hidden
      >
        <span className="select-none">Trabzon Yaz Fest 2026</span>
        <span className="select-none">Ziyaretçi Sunumu</span>
      </div>

      <div
        ref={scrollContainerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white"
      >
        <section
          ref={(el) => {
            slidesRef.current[0] = el;
          }}
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden bg-black"
          aria-label="Trabzon Yaz Fest 2026 açılış"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(1).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>
          <div className="relative min-h-0 flex-1 w-full">
            <Image
              src="/images/hero-festival.jpg"
              alt="Trabzon Yaz Fest 2026 festival görseli"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/60"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
              <div className="max-w-5xl text-center">
                <h1
                  className="break-words text-[clamp(1.75rem,6.5vw,4.5rem)] font-bold uppercase leading-[1.08] tracking-[0.12em] text-white/[0.96] sm:tracking-[0.15em] md:tracking-[0.18em]"
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
                <p className="mx-auto mt-2.5 max-w-xl break-words px-1 text-[clamp(0.6875rem,1.85vw,0.875rem)] font-normal leading-relaxed tracking-[0.05em] text-white/50 sm:mt-3 sm:px-2 sm:text-[clamp(0.75rem,1.7vw,0.9rem)] sm:tracking-[0.06em] md:text-[clamp(0.8125rem,1.5vw,0.9375rem)]">
                  Trabzon Ortahisar Akyazı Spor Kompleksi
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            slidesRef.current[1] = el;
          }}
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden border-t border-white/[0.06] bg-black"
          aria-labelledby="sahne-deneyimi-title"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(2).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className="relative aspect-[16/10] min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[20rem] sm:rounded-xl md:aspect-auto md:min-h-[min(72svh,44rem)]">
                  <Image
                    src="/images/stage-experience.jpg"
                    alt="Sahne deneyimi"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25 sm:bg-gradient-to-r sm:from-black/50 sm:via-black/18 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:items-start md:justify-center md:p-8 lg:p-10">
                    <div className="w-full max-w-md rounded-xl border border-white/[0.12] bg-black/45 px-5 py-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.85)] backdrop-blur-md ring-1 ring-white/[0.07] sm:px-6 sm:py-6 md:max-w-[26rem] md:bg-black/40">
                      <h2 id="sahne-deneyimi-title" className="sr-only">
                        Sahne deneyimi
                      </h2>
                      <ul className="mt-0 list-none space-y-2 text-left text-sm leading-snug text-white/78 sm:space-y-2.5 sm:text-[0.9375rem]">
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
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden border-t border-white/[0.06] bg-black"
          aria-labelledby="cocuk-etkinlikleri-title"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(3).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className="relative aspect-[16/10] min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[20rem] sm:rounded-xl md:aspect-auto md:min-h-[min(72svh,44rem)]">
                  <Image
                    src="/images/kids-area.jpg"
                    alt="Çocuk etkinlikleri alanı"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 sm:bg-gradient-to-br sm:from-black/48 sm:via-black/12 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:items-start md:justify-start md:p-8 md:pt-10 lg:p-10 lg:pt-14">
                    <div className="w-full max-w-md rounded-xl border border-white/[0.1] bg-black/38 px-5 py-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.82)] backdrop-blur-md ring-1 ring-white/[0.06] sm:px-6 sm:py-6 md:max-w-[26rem] md:bg-black/35">
                      <h2 id="cocuk-etkinlikleri-title" className="sr-only">
                        Çocuk etkinlikleri
                      </h2>
                      <ul className="mt-0 list-none space-y-2 text-left text-sm leading-snug text-white/78 sm:space-y-2.5 sm:text-[0.9375rem]">
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
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden border-t border-white/[0.06] bg-black"
          aria-labelledby="yetiskin-etkinlikleri-title"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(4).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className="relative aspect-[16/10] min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[20rem] sm:rounded-xl md:aspect-auto md:min-h-[min(72svh,44rem)]">
                  <Image
                    src="/images/adult-activities.jpg"
                    alt="Yetişkin etkinlikleri"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/32 via-transparent to-black/18 sm:bg-gradient-to-bl sm:from-black/46 sm:via-black/14 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:items-end md:justify-start md:p-8 md:pt-10 lg:p-10 lg:pt-12">
                    <div className="w-full max-w-md rounded-xl border border-white/[0.1] bg-black/38 px-5 py-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.82)] backdrop-blur-md ring-1 ring-white/[0.06] sm:px-6 sm:py-6 md:max-w-[26rem] md:bg-black/35">
                      <h2 id="yetiskin-etkinlikleri-title" className="sr-only">
                        Yetişkin etkinlikleri
                      </h2>
                      <ul className="mt-0 list-none space-y-2 text-left text-sm leading-snug text-white/78 sm:space-y-2.5 sm:text-[0.9375rem]">
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
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden border-t border-white/[0.06] bg-black"
          aria-labelledby="festival-alani-title"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(5).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className="relative aspect-[16/10] min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[20rem] sm:rounded-xl md:aspect-auto md:min-h-[min(72svh,44rem)]">
                  <Image
                    src="/images/festival-area.jpg"
                    alt="Festival alanı"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25 sm:bg-gradient-to-r sm:from-black/48 sm:via-black/16 sm:to-transparent"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:items-start md:justify-center md:p-8 lg:p-10">
                    <div className="w-full max-w-md rounded-xl border border-white/[0.1] bg-black/38 px-5 py-5 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.82)] backdrop-blur-md ring-1 ring-white/[0.06] sm:px-6 sm:py-6 md:max-w-[26rem] md:bg-black/35">
                      <h2 id="festival-alani-title" className="sr-only">
                        Festival alanı
                      </h2>
                      <ul className="mt-0 list-none space-y-2 text-left text-sm leading-snug text-white/78 sm:space-y-2.5 sm:text-[0.9375rem]">
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
          className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden border-t border-white/[0.06] bg-black"
          aria-labelledby="kapanis-cta-title"
        >
          <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
            {String(6).padStart(2, "0")} /{" "}
            {String(SLIDE_COUNT).padStart(2, "0")}
          </p>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pb-10 pt-6 sm:px-5 sm:pb-12 sm:pt-8 md:px-8 lg:px-12">
            <div className={`${SPONSOR_FRAME_OUTER} w-full`}>
              <div className="p-2 sm:p-4 md:p-5 lg:p-7">
                <div className="relative aspect-[16/10] min-h-[17rem] w-full overflow-hidden rounded-lg sm:min-h-[20rem] sm:rounded-xl md:aspect-auto md:min-h-[min(72svh,44rem)]">
                  <Image
                    src="/images/festival-cta.jpg"
                    alt="Trabzon Yaz Fest 2026"
                    fill
                    className="object-cover object-[center_20%]"
                    sizes="(max-width: 768px) 100vw, 1400px"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/32 via-black/5 to-transparent sm:from-black/28"
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex items-end justify-center px-4 pb-10 sm:pb-12 md:pb-14">
                    <div
                      id="kapanis-cta-title"
                      className="max-w-xl text-center leading-relaxed"
                      style={{
                        textShadow:
                          "0 1px 12px rgba(0,0,0,0.55), 0 2px 4px rgba(0,0,0,0.35)",
                      }}
                    >
                      <p className="text-[clamp(0.75rem,2.1vw,0.9375rem)] font-semibold uppercase tracking-[0.22em] text-white/88 sm:tracking-[0.26em] md:tracking-[0.3em]">
                        10 – 11 – 12 TEMMUZ 2026
                      </p>
                      <p className="mt-2 text-[clamp(0.625rem,1.65vw,0.8125rem)] font-normal tracking-[0.06em] text-white/70">
                        Trabzon Ortahisar Akyazı Spor Kompleksi
                      </p>
                    </div>
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
