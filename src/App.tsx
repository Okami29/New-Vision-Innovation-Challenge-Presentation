import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Maximize2,
  Minimize2,
  Printer,
  X,
} from 'lucide-react';
import { PRESENTATION_META, SLIDES } from './data/presentationData';
import { ScaledSlideFrame } from './components/SlideCanvas';
import { ScriptTimingView } from './components/ScriptTimingView';
import { AnalysisView } from './components/AnalysisView';
import { QaSourcesView } from './components/QaSourcesView';
import { exportPresentationPptx } from './utils/exportPptx';

type NavTab = 'deck' | 'script' | 'analysis' | 'qa';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('deck');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [showNotesDrawer, setShowNotesDrawer] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isExportingPptx, setIsExportingPptx] = useState<boolean>(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const stageViewportRef = useRef<HTMLDivElement | null>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement | null>(null);
  const [fittedBox, setFittedBox] = useState<{ width: number; height: number }>({
    width: 960,
    height: 540,
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // Dynamically fit 16:9 slide completely inside the available viewport (no cropping, no scrolling)
  useEffect(() => {
    if (activeTab !== 'deck') return;
    const el = stageViewportRef.current;
    if (!el) return;

    const computeFit = () => {
      const rect = el.getBoundingClientRect();
      const padX = isFullscreen ? 40 : 32;
      const padY = isFullscreen ? 80 : 28;
      const availW = Math.max(320, rect.width - padX);
      const availH = Math.max(180, rect.height - padY);
      const targetW = Math.floor(Math.min(availW, (availH * 16) / 9));
      const targetH = Math.floor((targetW * 9) / 16);
      setFittedBox({ width: targetW, height: targetH });
    };

    computeFit();
    const ro = new ResizeObserver(computeFit);
    ro.observe(el);
    window.addEventListener('resize', computeFit);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', computeFit);
    };
  }, [activeTab, isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== 'deck') return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        if (showNotesDrawer) setShowNotesDrawer(false);
        if (isFullscreen) {
          setIsFullscreen(false);
          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTab, isFullscreen, showNotesDrawer, nextSlide, prevSlide]);

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (fullscreenContainerRef.current?.requestFullscreen) {
        try {
          await fullscreenContainerRef.current.requestFullscreen();
        } catch {
          // Overlay fullscreen works cleanly inside iframe sandboxes
        }
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        try {
          await document.exitFullscreen();
        } catch {
          // Ignore
        }
      }
    }
  };

  const handleDownloadPptx = async () => {
    setIsExportingPptx(true);
    setExportError(null);
    try {
      await exportPresentationPptx();
    } catch {
      setExportError('PPTX ფაილის გენერაცია ვერ მოხერხდა. სცადეთ ხელახლა.');
    } finally {
      setIsExportingPptx(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleJumpToSlide = (index: number) => {
    setCurrentSlide(index);
    setActiveTab('deck');
  };

  const activeSpec = SLIDES[currentSlide];

  return (
    <div
      className={`flex flex-col bg-[#F7F5F0] text-[#142029] ${
        activeTab === 'deck' ? 'h-screen overflow-hidden' : 'min-h-screen'
      }`}
    >
      {/* TOP BAR (Strict 3-Zone Contract: Brand — 4 Nav Links — 1 Primary CTA) */}
      <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#002A41]/12 shrink-0">
        <div className="max-w-[1440px] mx-auto px-6 h-[60px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveTab('deck')}
            className="flex items-center gap-3.5 text-left whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00616F] rounded"
          >
            <img
              src={`${import.meta.env.BASE_URL}brand/nvu-logo.svg`}
              alt="New Vision University"
              className="h-7 w-auto object-contain shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="text-[15px] font-serif font-semibold tracking-tight text-[#002A41] whitespace-nowrap shrink-0">
              New Vision Innovation Challenge
            </span>
          </button>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4A5A66]">
            <button
              onClick={() => setActiveTab('deck')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                activeTab === 'deck'
                  ? 'text-[#002A41] border-[#00616F]'
                  : 'border-transparent hover:text-[#002A41]'
              }`}
            >
              პრეზენტაცია
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                activeTab === 'script'
                  ? 'text-[#002A41] border-[#00616F]'
                  : 'border-transparent hover:text-[#002A41]'
              }`}
            >
              გამოსვლის ტექსტი
            </button>
            <button
              onClick={() => setActiveTab('analysis')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                activeTab === 'analysis'
                  ? 'text-[#002A41] border-[#00616F]'
                  : 'border-transparent hover:text-[#002A41]'
              }`}
            >
              კონკურსების ანალიზი
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                activeTab === 'qa'
                  ? 'text-[#002A41] border-[#00616F]'
                  : 'border-transparent hover:text-[#002A41]'
              }`}
            >
              კითხვა-პასუხი
            </button>
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="shrink-0">
            <button
              onClick={handleDownloadPptx}
              disabled={isExportingPptx}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#002A41] hover:bg-[#00616F] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00616F]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isExportingPptx ? 'მზადდება PPTX...' : 'PPTX ჩამოტვირთვა'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Nav Strip */}
        <div className="lg:hidden border-t border-[#002A41]/10 px-4 py-2 flex items-center gap-4 overflow-x-auto text-xs font-medium">
          {(
            [
              ['deck', 'პრეზენტაცია'],
              ['script', 'გამოსვლის ტექსტი'],
              ['analysis', 'ანალიზი'],
              ['qa', 'კითხვა-პასუხი'],
            ] as [NavTab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === id ? 'text-[#002A41] font-semibold underline underline-offset-4' : 'text-[#4A5A66]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {exportError && (
        <div className="no-print max-w-[1440px] mx-auto px-6 pt-2 w-full shrink-0">
          <div className="bg-red-50 border border-red-200 text-red-900 text-xs px-4 py-2 rounded-md flex items-center justify-between">
            <span>{exportError}</span>
            <button
              onClick={() => setExportError(null)}
              className="underline ml-4 cursor-pointer"
            >
              დახურვა
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      {activeTab === 'deck' ? (
        <main
          ref={fullscreenContainerRef}
          className={`no-print flex-1 min-h-0 flex flex-col ${
            isFullscreen ? 'fixed inset-0 z-50 bg-[#0A131A]' : 'bg-[#EDEAE2]'
          }`}
        >
          {/* Compact Single-Row Presentation Control Bar */}
          {!isFullscreen && (
            <div className="bg-white border-b border-[#002A41]/12 px-6 py-2 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-[#F7F5F0] border border-[#002A41]/14 rounded-md p-0.5">
                  <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    aria-label="წინა სლაიდი"
                    className="p-1.5 rounded text-[#002A41] hover:bg-white disabled:opacity-35 cursor-pointer disabled:cursor-default"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2.5 font-mono text-xs font-semibold text-[#002A41] tabular-nums whitespace-nowrap">
                    {activeSpec.code} / 07
                  </span>
                  <button
                    onClick={nextSlide}
                    disabled={currentSlide === SLIDES.length - 1}
                    aria-label="შემდეგი სლაიდი"
                    className="p-1.5 rounded text-[#002A41] hover:bg-white disabled:opacity-35 cursor-pointer disabled:cursor-default"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-medium text-[#002A41] truncate max-w-[340px]">
                  {activeSpec.title}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNotesDrawer((v) => !v)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    showNotesDrawer
                      ? 'bg-[#002A41] text-white border-[#002A41]'
                      : 'bg-white text-[#002A41] border-[#002A41]/14 hover:bg-[#F7F5F0]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>ტექსტი</span>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#002A41] bg-white hover:bg-[#F7F5F0] border border-[#002A41]/14 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>PDF შენახვა</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#002A41] bg-white hover:bg-[#F7F5F0] border border-[#002A41]/14 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>სრული ეკრანი</span>
                </button>
              </div>
            </div>
          )}

          {/* Full-Viewport Centered 16:9 Slide Stage (No Upcoming Slides, No Clipping) */}
          <div
            ref={stageViewportRef}
            className="flex-1 min-h-0 w-full flex flex-col items-center justify-center p-2 sm:p-3 relative"
          >
            <div
              style={{
                width: `${fittedBox.width}px`,
                height: `${fittedBox.height}px`,
              }}
              className="rounded-lg overflow-hidden shadow-lg border border-[#002A41]/18 bg-white shrink-0"
            >
              <ScaledSlideFrame slideIndex={currentSlide} />
            </div>

            {isFullscreen && (
              <div className="mt-3 flex items-center gap-4 text-white text-xs shrink-0">
                <button
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-35 rounded cursor-pointer"
                >
                  ← წინა
                </button>
                <span className="font-mono tabular-nums">
                  სლაიდი {activeSpec.code} / 07
                </span>
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === SLIDES.length - 1}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 disabled:opacity-35 rounded cursor-pointer"
                >
                  შემდეგი →
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded cursor-pointer ml-4"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>გასვლა (Esc)</span>
                </button>
              </div>
            )}

            {/* Optional Slide-Out Speaker Notes Drawer (Overlay — never shrinks or pushes slide) */}
            {showNotesDrawer && !isFullscreen && (
              <aside className="fixed right-0 top-[60px] bottom-0 w-full max-w-[420px] bg-white border-l border-[#002A41]/15 shadow-2xl z-40 flex flex-col">
                <div className="px-6 py-4 border-b border-[#002A41]/12 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono text-[#00616F] font-semibold tabular-nums">
                      სლაიდი {activeSpec.code} / 07
                    </div>
                    <h2 className="text-base font-serif font-semibold text-[#002A41]">
                      {activeSpec.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowNotesDrawer(false)}
                    aria-label="დახურვა"
                    className="p-1.5 text-[#4A5A66] hover:text-[#002A41] rounded cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 text-sm">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[#5C6B77] mb-2">
                      მომხსენებლის ტექსტი
                    </div>
                    <p className="text-[15px] leading-[1.75] text-[#142029]">
                      {activeSpec.speakerScript}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#002A41]/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#8C6239] font-semibold mb-1.5">
                      მთავარი აზრი
                    </div>
                    <p className="text-sm font-medium text-[#002A41] leading-relaxed">
                      {activeSpec.keyTakeaway}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#002A41]/10">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#5C6B77] mb-2">
                      შენიშვნები
                    </div>
                    <ul className="space-y-2 text-[#374752]">
                      {activeSpec.speakerNotes.map((n, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="font-mono text-xs text-[#00616F] pt-0.5 tabular-nums">
                            0{i + 1}
                          </span>
                          <span>{n}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </main>
      ) : (
        <>
          <main className="no-print flex-1">
            {activeTab === 'script' && (
              <ScriptTimingView onJumpToSlide={handleJumpToSlide} />
            )}
            {activeTab === 'analysis' && <AnalysisView />}
            {activeTab === 'qa' && <QaSourcesView />}
          </main>

          <footer className="no-print border-t border-[#002A41]/12 bg-white mt-12">
            <div className="max-w-[1360px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4 text-xs text-[#5C6B77]">
              <div>
                New Vision Innovation Challenge · {PRESENTATION_META.dateLabel}
              </div>
              <div>
                New Vision University
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Print / PDF Deck Container (16in x 9in landscape per page) */}
      <div className="hidden print-deck-only">
        {SLIDES.map((s, idx) => (
          <div key={s.id} className="print-slide-page">
            <ScaledSlideFrame slideIndex={idx} fixedPrintScale />
          </div>
        ))}
      </div>
    </div>
  );
}
