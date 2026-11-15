import React from 'react';
import { PRESENTATION_META, SLIDES } from '../data/presentationData';
import { Clock, ArrowUpRight } from 'lucide-react';

interface ScriptTimingViewProps {
  onJumpToSlide: (index: number) => void;
}

export const ScriptTimingView: React.FC<ScriptTimingViewProps> = ({ onJumpToSlide }) => {
  return (
    <div className="max-w-[1160px] mx-auto px-6 py-10">
      {/* Editorial Header */}
      <div className="border-b border-[#002A41]/15 pb-8 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-3">
          <span>სრული გამოსვლის ტექსტი</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">ჯამური დრო: 07:00 წუთი (420 წამი)</span>
          <span aria-hidden="true">·</span>
          <span>{PRESENTATION_META.presenterName}</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-[#002A41] leading-tight max-w-3xl text-balance">
          7-წუთიანი გამოსვლის ტექსტი და დროის განაწილება
        </h1>
        <p className="text-[15px] text-[#4A5A66] mt-3 max-w-2xl leading-relaxed">
          ტექსტი გათვლილია ნორმალურ, აკადემიურ მეტყველების ტემპზე. თითოეულ სლაიდს ახლავს ზუსტი ქრონომეტრაჟი და მომხსენებლის პრაქტიკული შენიშვნები წარდგენისთვის.
        </p>

        {/* Time Distribution Matrix */}
        <div className="mt-7 bg-white border border-[#002A41]/12 rounded-lg p-5">
          <div className="flex items-center justify-between text-xs font-mono text-[#5C6B77] mb-3">
            <span>ქრონომეტრაჟის განაწილება სლაიდების მიხედვით</span>
            <span className="tabular-nums">00:00 — 07:00</span>
          </div>
          <div className="flex w-full h-3 rounded overflow-hidden bg-[#EBE6DF] gap-0.5">
            {SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => onJumpToSlide(s.id - 1)}
                title={`სლაიდი ${s.code}: ${s.title} (${s.durationSec} წმ)`}
                style={{ width: `${(s.durationSec / 420) * 100}%` }}
                className="h-full bg-[#002A41] hover:bg-[#00616F] transition-colors cursor-pointer"
              />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-4">
            {SLIDES.map((s) => (
              <button
                key={s.id}
                onClick={() => onJumpToSlide(s.id - 1)}
                className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00616F] rounded p-1.5 -m-1.5 hover:bg-[#F7F5F0] transition-colors"
              >
                <div className="font-mono text-xs text-[#00616F] font-semibold tabular-nums">
                  {s.code} · {s.durationSec} წმ
                </div>
                <div className="text-xs font-medium text-[#002A41] truncate mt-0.5 group-hover:underline">
                  {s.title}
                </div>
                <div className="font-mono text-[11px] text-[#5C6B77] tabular-nums">
                  {s.startTime}–{s.endTime}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide-by-Slide Script */}
      <div className="space-y-8">
        {SLIDES.map((slide, idx) => (
          <article
            key={slide.id}
            className="bg-white border border-[#002A41]/12 rounded-lg p-6 lg:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-[#002A41]/10">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-[#00616F] font-semibold tabular-nums mb-1.5">
                  <span>სლაიდი {slide.code} / 07</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {slide.startTime} – {slide.endTime} ({slide.durationSec} წამი)
                  </span>
                </div>
                <h2 className="text-xl lg:text-2xl font-serif font-semibold text-[#002A41]">
                  {slide.title}
                </h2>
                <p className="text-sm text-[#4A5A66] mt-1">{slide.subtitle}</p>
              </div>

              <button
                onClick={() => onJumpToSlide(idx)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#002A41] bg-[#F7F5F0] hover:bg-[#EBE6DF] border border-[#002A41]/15 rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>სლაიდის ნახვა</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
              {/* Main Spoken Script */}
              <div className="lg:col-span-8">
                <div className="text-xs font-mono uppercase tracking-[0.12em] text-[#5C6B77] mb-3">
                  მომხსენებლის ტექსტი
                </div>
                <p className="text-[16px] leading-[1.8] text-[#142029] max-w-prose">
                  {slide.speakerScript}
                </p>
              </div>

              {/* Margin Notes */}
              <div className="lg:col-span-4 lg:border-l lg:border-[#002A41]/10 lg:pl-6">
                <div className="text-xs font-mono uppercase tracking-[0.12em] text-[#8C6239] mb-2">
                  საკვანძო გზავნილი
                </div>
                <p className="text-sm font-medium text-[#002A41] leading-relaxed mb-5">
                  {slide.keyTakeaway}
                </p>

                <div className="text-xs font-mono uppercase tracking-[0.12em] text-[#5C6B77] mb-2">
                  მომხსენებლის შენიშვნები
                </div>
                <ul className="space-y-2 text-[13.5px] text-[#374752] leading-relaxed">
                  {slide.speakerNotes.map((note, nIdx) => (
                    <li key={nIdx} className="flex items-start gap-2">
                      <span className="font-mono text-xs text-[#00616F] pt-0.5 tabular-nums">
                        0{nIdx + 1}
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
