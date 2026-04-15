"use client";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { PRESENTATION_SLIDE_PATHS as slides } from "@/lib/presentation-slides";
import { usePresentationSlides } from "@/lib/use-presentation-slides";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

const ENTRANCE_MS = 700;
const PAGE_INTRO_MS = 1050;

const PDF_FILENAME = "Trabzon_Yaz_Fest_2026_Sponsor_Sunumu.pdf";

const WHATSAPP_PREFILL_MESSAGE =
  "Trabzon Yaz Fest 2026 sponsorluk hakkında bilgi almak istiyorum";
const WHATSAPP_PREFILL_TEXT = encodeURIComponent(WHATSAPP_PREFILL_MESSAGE);

const WHATSAPP_HAT_1_URL = `https://wa.me/905425418661?text=${WHATSAPP_PREFILL_TEXT}`;
const WHATSAPP_HAT_2_URL = `https://wa.me/905322931235?text=${WHATSAPP_PREFILL_TEXT}`;

const SPLASH_HOLD_MS = 1400;
const SPLASH_FADE_MS = 500;
const SPLASH_TEXT_IN_MS = 560;

type SplashStage = "enter" | "exit" | "off";

function getFullscreenElement(): Element | null {
  const doc = document as Document & {
    webkitFullscreenElement?: Element | null;
  };
  return document.fullscreenElement ?? doc.webkitFullscreenElement ?? null;
}

async function requestFullscreenEl(el: HTMLElement) {
  const anyEl = el as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
  };
  if (el.requestFullscreen) {
    await el.requestFullscreen();
    return;
  }
  if (anyEl.webkitRequestFullscreen) {
    await Promise.resolve(anyEl.webkitRequestFullscreen());
  }
}

async function exitFullscreenDoc() {
  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
  };
  if (document.exitFullscreen) {
    await document.exitFullscreen();
    return;
  }
  if (doc.webkitExitFullscreen) {
    await Promise.resolve(doc.webkitExitFullscreen());
  }
}

type FramePhase = "dim" | "entering" | "active";

function waitForImages(container: HTMLElement | null) {
  if (!container) return Promise.resolve();
  const imgs = container.querySelectorAll("img");
  return Promise.all(
    Array.from(imgs).map(
      (img) =>
        new Promise<void>((resolve, reject) => {
          if (img.complete && img.naturalHeight > 0) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Görsel yüklenemedi"));
        }),
    ),
  );
}

function AnimatedSlideFrame({
  index,
  activeSlide,
  slideSrc,
  priority,
  pageIntro,
  onPageIntroComplete,
}: {
  index: number;
  activeSlide: number;
  slideSrc: string;
  priority: boolean;
  pageIntro: boolean;
  onPageIntroComplete: () => void;
}) {
  const isActive = activeSlide === index;
  const [phase, setPhase] = useState<FramePhase>(() =>
    isActive ? "entering" : "dim",
  );

  const [pageIntroPhase, setPageIntroPhase] = useState<"from" | "to" | null>(
    () => (pageIntro ? "from" : null),
  );

  const prevPageIntroRef = useRef(pageIntro);

  useLayoutEffect(() => {
    if (!pageIntro) {
      setPageIntroPhase(null);
      return;
    }
    setPageIntroPhase("from");
    const raf2Ref = { current: 0 };
    const raf1 = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => setPageIntroPhase("to"));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2Ref.current);
    };
  }, [pageIntro]);

  useEffect(() => {
    if (!pageIntro || pageIntroPhase !== "to") return;
    const t = window.setTimeout(() => {
      onPageIntroComplete();
    }, PAGE_INTRO_MS + 40);
    return () => clearTimeout(t);
  }, [pageIntro, pageIntroPhase, onPageIntroComplete]);

  useLayoutEffect(() => {
    const pageIntroJustEnded = prevPageIntroRef.current && !pageIntro;
    prevPageIntroRef.current = pageIntro;

    if (!isActive) {
      setPhase("dim");
      return;
    }

    if (pageIntro) {
      setPhase("active");
      return;
    }

    if (pageIntroJustEnded) {
      setPhase("active");
      return;
    }

    setPhase("entering");
    const raf2Ref = { current: 0 };
    const raf1 = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => setPhase("active"));
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2Ref.current);
    };
  }, [isActive, pageIntro]);

  const style: CSSProperties =
    pageIntro && pageIntroPhase === "from"
      ? {
          opacity: 0,
          transform: "scale(0.97) translateY(18px)",
          transition: "none",
          transformOrigin: "center center",
          willChange: "opacity, transform",
        }
      : pageIntro && pageIntroPhase === "to"
        ? {
            opacity: 1,
            transform: "scale(1) translateY(0)",
            transition: `opacity ${PAGE_INTRO_MS}ms ease-out, transform ${PAGE_INTRO_MS}ms ease-out`,
            transformOrigin: "center center",
            willChange: "opacity, transform",
          }
        : phase === "dim"
          ? {
              opacity: 0.65,
              transform: "scale(1) translateY(0)",
              transition: `opacity ${ENTRANCE_MS}ms ease-out, transform ${ENTRANCE_MS}ms ease-out`,
              transformOrigin: "center center",
              willChange: "opacity, transform",
            }
          : phase === "entering"
            ? {
                opacity: 0,
                transform: "scale(0.96) translateY(20px)",
                transition: "none",
                transformOrigin: "center center",
                willChange: "opacity, transform",
              }
            : {
                opacity: 1,
                transform: "scale(1) translateY(0)",
                transition: `opacity ${ENTRANCE_MS}ms ease-out, transform ${ENTRANCE_MS}ms ease-out`,
                transformOrigin: "center center",
                willChange: "opacity, transform",
              };

  return (
    <div className="relative h-full min-h-0 w-full" style={style}>
      <div className="relative h-full min-h-0 w-full overflow-hidden rounded-xl bg-black ring-1 ring-white/[0.14] shadow-[0_20px_80px_-16px_rgba(0,0,0,0.88)] sm:rounded-2xl sm:shadow-[0_28px_100px_-18px_rgba(0,0,0,0.9)] lg:rounded-[1.25rem] lg:shadow-[0_32px_120px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative h-full w-full p-2 sm:p-4 md:p-5 lg:p-7">
          <div className="relative h-full w-full min-h-0">
            <Image
              src={slideSrc}
              alt=""
              fill
              className="object-contain object-center"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1400px"
              priority={priority}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [pageIntroDone, setPageIntroDone] = useState(false);
  const [pdfExporting, setPdfExporting] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splashStage, setSplashStage] = useState<SplashStage>("enter");
  const [splashTextIn, setSplashTextIn] = useState(false);
  const [whatsappMenuOpen, setWhatsappMenuOpen] = useState(false);
  const { activeSlide, slidesRef, scrollContainerRef, goToSlide } =
    usePresentationSlides(slides.length, splashStage === "off");
  const pdfExportLockRef = useRef(false);
  const presentationRootRef = useRef<HTMLDivElement>(null);
  const pdfExportRootRef = useRef<HTMLDivElement>(null);
  const pdfPageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const whatsappContactTriggerRef = useRef<HTMLButtonElement>(null);
  const whatsappMenuPanelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setSplashTextIn(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    const tExit = window.setTimeout(() => setSplashStage("exit"), SPLASH_HOLD_MS);
    const tOff = window.setTimeout(
      () => setSplashStage("off"),
      SPLASH_HOLD_MS + SPLASH_FADE_MS,
    );
    return () => {
      clearTimeout(tExit);
      clearTimeout(tOff);
    };
  }, []);

  useEffect(() => {
    if (splashStage === "off") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [splashStage]);

  useEffect(() => {
    if (activeSlide !== slides.length - 1) setWhatsappMenuOpen(false);
  }, [activeSlide]);

  useEffect(() => {
    if (!whatsappMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (
        whatsappMenuPanelRef.current?.contains(t) ||
        whatsappContactTriggerRef.current?.contains(t)
      ) {
        return;
      }
      setWhatsappMenuOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setWhatsappMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [whatsappMenuOpen]);

  const handlePageIntroComplete = useCallback(() => {
    setPageIntroDone(true);
  }, []);

  const handlePdfDownload = useCallback(async () => {
    if (pdfExportLockRef.current) return;
    pdfExportLockRef.current = true;
    setPdfExporting(true);
    try {
      await waitForImages(pdfExportRootRef.current);
      await new Promise((r) => requestAnimationFrame(() => r(undefined)));
      await new Promise((r) => setTimeout(r, 120));

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 12;

      for (let i = 0; i < slides.length; i++) {
        const el = pdfPageRefs.current[i];
        if (!el) continue;

        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#000000",
          logging: false,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const imgW = pageW - 2 * margin;
        const imgH = (canvas.height * imgW) / canvas.width;
        let finalW = imgW;
        let finalH = imgH;
        if (finalH > pageH - 2 * margin) {
          finalH = pageH - 2 * margin;
          finalW = (canvas.width * finalH) / canvas.height;
        }
        const x = (pageW - finalW) / 2;
        const y = (pageH - finalH) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", x, y, finalW, finalH);
      }

      pdf.save(PDF_FILENAME);
    } catch (e) {
      console.error(e);
    } finally {
      pdfExportLockRef.current = false;
      setPdfExporting(false);
    }
  }, []);

  const syncFullscreenState = useCallback(() => {
    const el = presentationRootRef.current;
    const fs = getFullscreenElement();
    setIsFullscreen(Boolean(el && fs === el));
  }, []);

  useEffect(() => {
    syncFullscreenState();
    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener(
      "webkitfullscreenchange",
      syncFullscreenState as EventListener,
    );
    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener(
        "webkitfullscreenchange",
        syncFullscreenState as EventListener,
      );
    };
  }, [syncFullscreenState]);

  const toggleFullscreen = useCallback(async () => {
    const el = presentationRootRef.current;
    if (!el) return;
    try {
      if (getFullscreenElement() === el) {
        await exitFullscreenDoc();
      } else {
        await requestFullscreenEl(el);
      }
    } catch {
      /* kullanıcı veya tarayıcı reddedebilir */
    }
  }, []);

  return (
    <div
      ref={presentationRootRef}
      className="min-h-screen bg-black font-sans text-white antialiased"
    >
      {splashStage !== "off" ? (
        <div
          className={
            splashStage === "exit"
              ? "pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-black opacity-0 transition-opacity ease-out"
              : "fixed inset-0 z-[200] flex items-center justify-center bg-black opacity-100"
          }
          style={
            splashStage === "exit"
              ? { transitionDuration: `${SPLASH_FADE_MS}ms` }
              : undefined
          }
          aria-hidden
        >
          <div
            className={
              splashTextIn
                ? "flex max-w-lg translate-y-0 flex-col items-center gap-3 px-8 text-center opacity-100 transition-[opacity,transform] ease-out"
                : "flex max-w-lg translate-y-1.5 flex-col items-center gap-3 px-8 text-center opacity-0 transition-[opacity,transform] ease-out"
            }
            style={{ transitionDuration: `${SPLASH_TEXT_IN_MS}ms` }}
          >
            <p className="text-base font-bold uppercase tracking-[0.1em] text-white sm:text-lg md:text-xl">
              TRABZON YAZ FEST 2026
            </p>
            <p className="text-xs font-normal tracking-[0.1em] text-white/58 sm:text-sm">
              Karadeniz’in En Büyük Yaz Deneyimi
            </p>
          </div>
        </div>
      ) : null}

      <header className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-3 sm:top-7 md:top-8">
        <nav
          className="pointer-events-auto mt-3 flex w-full max-w-md flex-col gap-6 sm:mt-4 sm:max-w-none sm:w-auto sm:flex-row sm:items-stretch sm:justify-center sm:gap-8 md:gap-8"
          aria-label="Sunum seçimi"
        >
          <Link
            href="/"
            aria-current="page"
            onClick={(e) => {
              e.preventDefault();
              goToSlide(0);
              scrollContainerRef.current?.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="min-h-[48px] flex-1 rounded-xl border border-white/50 bg-gradient-to-b from-white/28 via-white/20 to-white/14 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_10px_40px_-14px_rgba(255,255,255,0.28),0_24px_56px_-28px_rgba(0,0,0,0.92)] ring-1 ring-white/25 backdrop-blur-md transition duration-200 ease-out hover:scale-105 hover:border-white/58 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.32),0_14px_48px_-12px_rgba(255,255,255,0.38),0_28px_64px_-24px_rgba(0,0,0,0.88)] hover:ring-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/45 sm:min-h-0 sm:flex-initial sm:min-w-[12.5rem] sm:px-9 sm:py-4 md:min-w-[13.5rem] md:px-10 md:py-5 md:text-sm"
          >
            Sponsor Sunumu
          </Link>
          <Link
            href="/ziyaretci-sunumu"
            className="min-h-[48px] flex-1 rounded-xl border-2 border-white/26 bg-transparent px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/72 shadow-[0_2px_16px_-8px_rgba(0,0,0,0.6)] backdrop-blur-sm transition duration-200 ease-out hover:scale-105 hover:border-white/42 hover:bg-white/[0.06] hover:text-white/92 hover:shadow-[0_0_28px_-10px_rgba(255,255,255,0.18),0_8px_32px_-20px_rgba(0,0,0,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35 sm:min-h-0 sm:flex-initial sm:min-w-[12.5rem] sm:px-9 sm:py-4 md:min-w-[13.5rem] md:px-10 md:py-5 md:text-sm"
          >
            Ziyaretçi Sunumu
          </Link>
        </nav>
      </header>

      <div className="fixed right-3 top-3 z-[100] flex flex-col items-end gap-1.5 sm:right-4 sm:top-4 sm:gap-2 md:right-5 md:top-5">
        <button
          type="button"
          onClick={() => void toggleFullscreen()}
          className="rounded-sm border border-white/[0.12] bg-black/25 px-1.5 py-1 text-[8px] font-normal uppercase tracking-[0.1em] text-white/60 backdrop-blur-[6px] transition-colors duration-200 hover:border-white/20 hover:text-white/78 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/35 sm:px-2 sm:py-1 sm:text-[10px] md:px-2.5 md:py-1.5 md:text-[11px]"
          aria-pressed={isFullscreen}
          aria-label={
            isFullscreen ? "Tam ekran sunumundan çık" : "Sunumu tam ekranda göster"
          }
        >
          Tam Ekran
        </button>
        <button
          type="button"
          onClick={() => void handlePdfDownload()}
          disabled={pdfExporting}
          className="rounded border border-white/20 bg-black/40 px-2 py-1.5 text-[9px] font-normal uppercase tracking-[0.1em] text-white/65 backdrop-blur-sm transition hover:border-white/35 hover:bg-black/55 hover:text-white/82 disabled:cursor-not-allowed disabled:opacity-50 sm:px-2.5 sm:py-1.5 sm:text-[10px] md:px-3 md:py-2 md:text-[11px]"
          aria-busy={pdfExporting}
        >
          {pdfExporting ? "Hazırlanıyor…" : "PDF İndir"}
        </button>
      </div>

      <nav
        className="pointer-events-auto fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-y-1.5 sm:flex sm:right-4 sm:gap-y-2 md:right-6 md:gap-y-2.5 lg:right-8 lg:gap-y-3"
        aria-label="Slayt gezinmesi"
      >
        {slides.map((_, index) => {
          const isActive = activeSlide === index;
          return (
            <button
              key={slides[index]}
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
          (activeSlide === slides.length - 1 ? "max-sm:hidden" : "")
        }
        aria-hidden
      >
        <span className="select-none">Trabzon Yaz Fest 2026</span>
        <span className="select-none">Sponsor Sunumu</span>
      </div>

      <div
        ref={scrollContainerRef}
        className="h-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth bg-black text-white"
      >
        {slides.map((slide, index) => (
          <section
            key={slide}
            ref={(el) => {
              slidesRef.current[index] = el;
            }}
            className="relative flex h-screen w-full shrink-0 snap-start flex-col overflow-hidden bg-black"
          >
            <p className="pointer-events-none absolute left-3 top-[5.25rem] z-30 text-[9px] font-normal uppercase tabular-nums tracking-[0.1em] text-white/52 drop-shadow-md sm:left-8 sm:top-[5.75rem] sm:text-[10px] md:left-10 md:top-28 lg:left-12 lg:top-32 lg:text-xs">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
            <div
              className={
                "flex min-h-0 flex-1 items-center justify-center px-3 pt-[8.5rem] sm:px-5 sm:pt-[8rem] md:px-7 md:pt-32 lg:px-10 lg:pt-36 " +
                (index === slides.length - 1
                  ? "pb-2 sm:pb-3 md:pb-4 lg:pb-5"
                  : "pb-6 sm:pb-8 md:pb-10 lg:pb-12")
              }
            >
              <div className="relative h-full w-full max-w-[1400px] min-h-0">
                <AnimatedSlideFrame
                  index={index}
                  activeSlide={activeSlide}
                  slideSrc={slide}
                  priority={index === 0}
                  pageIntro={
                    index === 0 && !pageIntroDone && splashStage === "off"
                  }
                  onPageIntroComplete={handlePageIntroComplete}
                />
              </div>
            </div>

            {index === slides.length - 1 ? (
              <div className="pointer-events-auto shrink-0 px-3 pb-5 pt-0.5 sm:px-5 sm:pb-7 sm:pt-1 md:px-6 md:pb-8">
                <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2.5 text-center sm:gap-3 md:gap-4">
                  <h2 className="text-sm font-bold uppercase leading-snug tracking-[0.1em] text-white sm:text-base md:text-lg">
                    Ana Sponsor Görüşmeleri Başlamıştır
                  </h2>
                  <p className="max-w-xl px-1 text-xs font-normal leading-relaxed tracking-[0.1em] text-white/58 sm:px-0 sm:text-sm md:text-[0.9375rem]">
                    Markanızı Trabzon’un en büyük yaz deneyiminin merkezine
                    taşıyın
                  </p>
                  <p className="max-w-lg px-2 py-0.5 text-center text-[10px] font-normal italic leading-relaxed tracking-[0.08em] text-white/42 sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.1em] sm:text-white/45 md:text-[0.8125rem]">
                    Sınırlı sayıda ana sponsor alınacaktır
                  </p>
                  <button
                    ref={whatsappContactTriggerRef}
                    type="button"
                    onClick={() => setWhatsappMenuOpen((o) => !o)}
                    aria-expanded={whatsappMenuOpen}
                    aria-haspopup="dialog"
                    className="mt-1 min-h-[44px] w-full max-w-xs rounded-sm border border-white/18 bg-white/[0.07] px-5 py-3 text-[10px] font-normal uppercase tracking-[0.1em] text-white/80 transition-colors duration-200 hover:border-white/28 hover:bg-white/[0.11] hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/35 sm:mt-2 sm:min-h-0 sm:w-auto sm:max-w-none sm:px-6 sm:py-3 sm:text-[11px]"
                  >
                    Hemen İletişime Geç
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <div
        ref={pdfExportRootRef}
        aria-hidden
        className="pointer-events-none fixed top-0 -left-[15000px] z-[-1] flex flex-col"
      >
        {slides.map((slide, index) => (
          <div
            key={`pdf-export-${slide}`}
            ref={(el) => {
              pdfPageRefs.current[index] = el;
            }}
            className="box-border flex shrink-0 items-center justify-center bg-black"
            style={{
              width: 1296,
              padding: 48,
              boxSizing: "border-box",
            }}
          >
            <div className="w-[1200px] max-w-[1200px] shrink-0">
              {/* Plain <img> for reliable html2canvas capture; paths match public/. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide}
                alt=""
                width={1200}
                className="block h-auto w-full max-w-[1200px] object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {whatsappMenuOpen ? (
        <div
          ref={whatsappMenuPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-contact-title"
          className="fixed left-1/2 top-1/2 z-[170] w-[min(20rem,calc(100vw-1.25rem))] -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/[0.14] bg-black/94 px-3 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_28px_-8px_rgba(255,255,255,0.12),0_20px_50px_-18px_rgba(0,0,0,0.85)] backdrop-blur-md sm:w-[min(19rem,calc(100vw-2rem))] sm:px-4 sm:py-4 md:w-[min(18rem,calc(100vw-2.5rem))]"
        >
          <p
            id="whatsapp-contact-title"
            className="mb-2.5 text-center text-[10px] font-normal uppercase tracking-[0.1em] text-white/62 sm:mb-3 sm:text-[11px]"
          >
            İletişim Seçin
          </p>
          <div className="flex flex-col gap-2 sm:gap-2">
            <a
              href={WHATSAPP_HAT_1_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center text-[10px] font-normal uppercase tracking-[0.1em] text-white/78 transition-colors duration-200 hover:border-white/22 hover:bg-white/[0.08] hover:text-white sm:min-h-[44px] sm:px-3.5 sm:py-2.5 sm:text-[11px]"
            >
              WhatsApp Hattı 1
            </a>
            <a
              href={WHATSAPP_HAT_2_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setWhatsappMenuOpen(false)}
              className="flex min-h-[48px] items-center justify-center rounded-sm border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center text-[10px] font-normal uppercase tracking-[0.1em] text-white/78 transition-colors duration-200 hover:border-white/22 hover:bg-white/[0.08] hover:text-white sm:min-h-[44px] sm:px-3.5 sm:py-2.5 sm:text-[11px]"
            >
              WhatsApp Hattı 2
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
