import React, { useEffect, useRef, useState } from 'react';
import {
  CONTEST_COMPARISONS,
  CONTEST_STAGES,
  GEORGIA_SCHOOL_SCALE,
  PATHWAY_NODES,
  PRESENTATION_META,
  PROPOSED_DIRECTIONS,
  SLIDES,
} from '../data/presentationData';

interface SlideCanvasProps {
  slideIndex: number;
  className?: string;
  fixedPrintScale?: boolean;
}

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;

export const ScaledSlideFrame: React.FC<SlideCanvasProps> = ({
  slideIndex,
  className = '',
  fixedPrintScale = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (fixedPrintScale) {
      setScale(1.2);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setScale(rect.width / SLIDE_WIDTH);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixedPrintScale]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/9] overflow-hidden select-none ${className}`}
    >
      <div
        style={{
          width: `${SLIDE_WIDTH}px`,
          height: `${SLIDE_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
        className="absolute top-0 left-0"
      >
        <SlideBody slideIndex={slideIndex} />
      </div>
    </div>
  );
};

const SlideHeader: React.FC<{
  code: string;
  title: string;
  subtitle: string;
  dark?: boolean;
}> = ({ code, title, subtitle, dark = false }) => (
  <div
    className={`shrink-0 flex items-start justify-between px-14 pt-6 pb-3.5 border-b ${
      dark ? 'border-white/15' : 'border-[#002A41]/12'
    }`}
  >
    <div className="max-w-[920px]">
      <div
        className={`flex items-center gap-3 text-[11.5px] tracking-[0.14em] uppercase font-mono mb-1 ${
          dark ? 'text-[#89C4CC]' : 'text-[#00616F]'
        }`}
      >
        <span className="tabular-nums">სლაიდი {code} / 07</span>
        <span aria-hidden="true">·</span>
        <span>NEW VISION INNOVATION CHALLENGE</span>
      </div>
      <h2
        className={`text-[27px] leading-[1.16] font-serif font-semibold tracking-tight ${
          dark ? 'text-white' : 'text-[#002A41]'
        }`}
      >
        {title}
      </h2>
      <p
        className={`text-[13px] mt-1 leading-snug ${
          dark ? 'text-white/75' : 'text-[#4A5A66]'
        }`}
      >
        {subtitle}
      </p>
    </div>
    <div className="shrink-0 pt-0.5">
      <img
        src={dark ? '/brand/nvu-logo-white.svg' : '/brand/nvu-logo.svg'}
        alt="New Vision University"
        className="h-[40px] w-auto object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  </div>
);

const SlideFooter: React.FC<{ dark?: boolean; note?: string }> = ({
  dark = false,
  note = 'New Vision University · სტრატეგიული წარდგენა მმართველი საბჭოსთვის',
}) => (
  <div
    className={`shrink-0 h-[40px] px-14 flex items-center justify-between text-[11px] border-t ${
      dark
        ? 'border-white/12 text-white/60 bg-[#002235]'
        : 'border-[#002A41]/10 text-[#5C6B77] bg-[#F4F1EA]'
    }`}
  >
    <span>{note}</span>
    <span className="font-mono tabular-nums">{PRESENTATION_META.dateLabel}</span>
  </div>
);

const SlideBody: React.FC<{ slideIndex: number }> = ({ slideIndex }) => {
  const slide = SLIDES[slideIndex] || SLIDES[0];

  // SLIDE 1 — COVER (Dark NVU Navy — no timings, no presenter/initiator fields)
  if (slideIndex === 0) {
    return (
      <div className="w-full h-full bg-[#002A41] text-white relative overflow-hidden flex flex-col justify-between">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.12]"
          viewBox="0 0 1280 720"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="1090" cy="310" r="340" stroke="#89C4CC" strokeWidth="1" />
          <circle cx="1090" cy="310" r="240" stroke="#89C4CC" strokeWidth="1" />
          <circle cx="1090" cy="310" r="140" stroke="#89C4CC" strokeWidth="1" />
          <line x1="0" y1="540" x2="1280" y2="540" stroke="#89C4CC" strokeWidth="1" />
          <line x1="880" y1="0" x2="880" y2="720" stroke="#89C4CC" strokeWidth="1" />
          <path d="M 80 540 Q 480 420 1090 310" stroke="#00616F" strokeWidth="2.5" />
          <circle cx="1090" cy="310" r="7" fill="#89C4CC" />
          <circle cx="480" cy="436" r="5" fill="#89C4CC" />
          <circle cx="80" cy="540" r="5" fill="#89C4CC" />
        </svg>

        <div className="relative z-10 flex items-center justify-between px-16 pt-12">
          <img
            src="/brand/nvu-logo-white.svg"
            alt="New Vision University"
            className="h-[54px] w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="text-right font-mono text-[12px] tracking-[0.12em] uppercase text-[#89C4CC] tabular-nums">
            <span>სლაიდი 01 / 07</span>
          </div>
        </div>

        <div className="relative z-10 px-16 max-w-[980px]">
          <p className="text-[13px] font-mono tracking-[0.18em] uppercase text-[#89C4CC] mb-4">
            სტრატეგიული ინიციატივა · New Vision University
          </p>
          <h1 className="text-[54px] leading-[1.08] font-serif font-bold tracking-tight text-white">
            NEW VISION
            <br />
            INNOVATION CHALLENGE
          </h1>
          <p className="text-[22px] text-[#C8E4E8] font-medium mt-4 leading-snug">
            {PRESENTATION_META.projectSubtitle}
          </p>

          <div className="mt-10 pt-8 border-t border-white/18 max-w-[840px]">
            <p className="text-[24px] leading-[1.42] font-serif text-white">
              {PRESENTATION_META.coreMessage}
            </p>
          </div>
        </div>

        <div className="relative z-10 px-16 py-7 border-t border-white/15 bg-[#002235] flex items-center justify-between text-[13px]">
          <div className="text-white/90 font-medium">
            New Vision University · მმართველი საბჭოსთვის წარმოდგენილი სტრატეგიული კონცეფცია
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.12em] text-[#89C4CC] mb-0.5">
              თარიღი და დრო
            </div>
            <div className="font-mono tabular-nums text-white">
              {PRESENTATION_META.dateLabel}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SLIDE 2 — EXISTING EXPERIENCE IN GEORGIA WITH HISTORICAL & VERIFIED NUMBERS
  if (slideIndex === 1) {
    return (
      <div className="w-full h-full bg-[#FBF9F5] text-[#142029] flex flex-col overflow-hidden">
        <SlideHeader code={slide.code} title={slide.title} subtitle={slide.subtitle} />

        <div className="flex-1 min-h-0 px-14 py-4 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
            {CONTEST_COMPARISONS.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between border-b border-[#002A41]/10 pb-2 mb-3">
                    <span className="font-mono text-[11px] tracking-[0.12em] text-[#00616F] font-semibold">
                      0{idx + 1} · {idx === 2 ? 'ისტორიული' : idx === 0 ? '2011 წლიდან' : '2014 წლიდან'}
                    </span>
                    <span className="text-[11px] text-[#5C6B77]">
                      {idx === 0 && 'VII–XII კლ. · 1–3 წევრი'}
                      {idx === 1 && '13–17 წ. · 2–5 წევრი'}
                      {idx === 2 && 'სტუ / სპქა'}
                    </span>
                  </div>

                  <h3 className="text-[18.5px] font-serif font-semibold text-[#002A41] leading-snug mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[11.5px] text-[#5C6B77] leading-snug mb-3">
                    {item.organizer}
                  </p>

                  <div className="bg-[#002A41] text-white rounded-md p-3.5 mb-2.5">
                    <div className="text-[26px] leading-none font-mono font-semibold text-white tabular-nums">
                      {item.headlineNumber}
                    </div>
                    <div className="text-[11.5px] text-[#C8E4E8] mt-1.5 leading-snug">
                      {item.headlineNumberLabel}
                    </div>
                  </div>

                  <div className="bg-[#F7F5F0] rounded-md px-3.5 py-2.5">
                    <div className="text-[15.5px] font-mono font-semibold text-[#00616F] tabular-nums">
                      {item.secondaryNumber}
                    </div>
                    <div className="text-[11px] text-[#4A5A66] leading-snug mt-0.5">
                      {item.secondaryNumberLabel}
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#002A41]/10">
                  <span className="text-[10.5px] uppercase tracking-wider text-[#8C6239] font-semibold block mb-0.5">
                    საუნივერსიტეტო სარგებელი
                  </span>
                  <p className="text-[12.5px] font-medium text-[#002A41] leading-snug">
                    {item.lessonForNVU}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="shrink-0 bg-[#002A41] text-white rounded-lg px-7 py-3 flex items-center justify-between gap-8">
            <div className="text-[11.5px] font-mono uppercase tracking-[0.14em] text-[#89C4CC] shrink-0">
              მთავარი დასკვნა
            </div>
            <p className="text-[14px] font-medium leading-snug text-white">
              „ჩვენ შეგვიძლია წარმატებული გამოცდილების საფუძველზე შევქმნათ ახალი მოდელი, რომელიც უშუალოდ უნივერსიტეტის გრძელვადიან განვითარებას მოემსახურება.“
            </p>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // SLIDE 3 — STRATEGIC VALUE FOR NVU + GEOSTAT REAL SCHOOL/STUDENT SCALE
  if (slideIndex === 2) {
    return (
      <div className="w-full h-full bg-[#FBF9F5] text-[#142029] flex flex-col overflow-hidden">
        <SlideHeader code={slide.code} title={slide.title} subtitle={slide.subtitle} />

        <div className="flex-1 min-h-0 px-14 py-4 flex flex-col justify-between gap-3.5">
          <div className="shrink-0 bg-white border border-[#002A41]/14 rounded-lg px-6 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#00616F]">
                  სკოლები საქართველოში
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[21px] font-mono font-semibold text-[#002A41] tabular-nums">
                    {GEORGIA_SCHOOL_SCALE.totalSchools}
                  </span>
                  <span className="text-[11.5px] text-[#4A5A66] tabular-nums">
                    ({GEORGIA_SCHOOL_SCALE.publicSchools} საჯარო · {GEORGIA_SCHOOL_SCALE.privateSchools} კერძო)
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-[#002A41]/12" />
              <div>
                <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#00616F]">
                  მოსწავლეთა რაოდენობა
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[21px] font-mono font-semibold text-[#002A41] tabular-nums">
                    {GEORGIA_SCHOOL_SCALE.totalStudents}
                  </span>
                  <span className="text-[11.5px] text-[#4A5A66] tabular-nums">
                    ({GEORGIA_SCHOOL_SCALE.tbilisiShare} თბილისი · {GEORGIA_SCHOOL_SCALE.regionsShare} რეგიონები)
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right text-[11px] font-mono text-[#5C6B77]">
              წყარო: {GEORGIA_SCHOOL_SCALE.sourceLabel}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5 flex-1 min-h-0">
            <div className="bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-center">
              <div className="font-mono text-[22px] font-semibold text-[#00616F] tabular-nums mb-1">
                01
              </div>
              <h3 className="text-[17px] font-serif font-semibold text-[#002A41] leading-snug mb-1.5">
                მომავალი სტუდენტების მოზიდვა
              </h3>
              <p className="text-[13px] text-[#374752] leading-relaxed">
                ურთიერთობა იწყება აბიტურიენტობამდე — პროექტული შემოქმედების ეტაპზე. ეს არის რეალისტური, გასაზომი და გრძელვადიანი არხი.
              </p>
            </div>

            <div className="bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-center">
              <div className="font-mono text-[22px] font-semibold text-[#00616F] tabular-nums mb-1">
                02
              </div>
              <h3 className="text-[17px] font-serif font-semibold text-[#002A41] leading-snug mb-1.5">
                სკოლებში ცნობადობის ზრდა
              </h3>
              <p className="text-[13px] text-[#374752] leading-relaxed">
                კონკურსი NVU-ს შესახებ ცოდნას ერთდროულად აწვდის მოსწავლეებს, მშობლებს, მასწავლებლებს, სკოლის ადმინისტრაციასა და რეგიონებს.
              </p>
            </div>

            <div className="bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-center">
              <div className="font-mono text-[22px] font-semibold text-[#00616F] tabular-nums mb-1">
                03
              </div>
              <h3 className="text-[17px] font-serif font-semibold text-[#002A41] leading-snug mb-1.5">
                გრძელვადიანი ურთიერთობა და რეპუტაცია
              </h3>
              <p className="text-[13px] text-[#374752] leading-relaxed">
                ნიჭიერი მოსწავლეების აღმოჩენა VIII–IX კლასიდან, პროფესორთა მენტორობა და სკოლებთან მდგრადი ინსტიტუციური პარტნიორობა.
              </p>
            </div>
          </div>

          <div className="shrink-0 grid grid-cols-12 gap-5">
            <div className="col-span-7 bg-[#002A41] text-white rounded-lg p-4.5 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#89C4CC] mb-2">
                რატომ სჯობს კონკურსი ერთჯერად სარეკლამო კამპანიას
              </div>
              <div className="grid grid-cols-11 items-center gap-3">
                <div className="col-span-5 bg-white/8 border border-white/15 rounded p-3">
                  <div className="text-[10.5px] font-mono uppercase tracking-wider text-white/60 mb-1">
                    სტანდარტული რეკლამა
                  </div>
                  <div className="text-[13.5px] font-medium text-white/90 leading-snug">
                    მოსწავლეს უნივერსიტეტზე მხოლოდ ინფორმაციას აწვდის — აბიტურიენტობის ბოლო თვეებში.
                  </div>
                </div>

                <div className="col-span-1 flex justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L13 6M19 12L13 18"
                      stroke="#89C4CC"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="col-span-5 bg-[#00616F] border border-[#89C4CC]/40 rounded p-3">
                  <div className="text-[10.5px] font-mono uppercase tracking-wider text-[#C8E4E8] mb-1">
                    INNOVATION CHALLENGE
                  </div>
                  <div className="text-[13.5px] font-semibold text-white leading-snug">
                    ქმნის უნივერსიტეტთან უშუალო, დადებით გამოცდილებას ჯერ კიდევ სკოლის ასაკში.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-5 bg-white border border-[#002A41]/14 rounded-lg p-4.5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] mb-1">
                  თანხვედრა NVU-ის მისიასა და 2025–2031 გეგმასთან
                </div>
                <p className="text-[13px] text-[#142029] leading-snug">
                  კონკურსი აძლიერებს უნივერსიტეტის უკვე არსებულ ღირებულებებს: <strong>„Inspire to Care“</strong>, კვლევისა და ინოვაციის ხელშეწყობას, SDG-სთან შესაბამისობასა და განათლების ხელმისაწვდომობას.
                </p>
              </div>
              <div className="pt-2 mt-2 border-t border-[#002A41]/10 flex items-center justify-between text-[11.5px] text-[#4A5A66]">
                <span>ინტერდისციპლინური კავშირი</span>
                <span className="font-medium text-[#002A41]">მედიცინა · ბიზნესი · ტექნოლოგიები</span>
              </div>
            </div>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // SLIDE 4 — HOW THE CONTEST WORKS (1–6 მოსწავლე · compact flex fit, zero clipping)
  if (slideIndex === 3) {
    return (
      <div className="w-full h-full bg-[#FBF9F5] text-[#142029] flex flex-col overflow-hidden">
        <SlideHeader code={slide.code} title={slide.title} subtitle={slide.subtitle} />

        <div className="flex-1 min-h-0 px-14 py-3.5 flex flex-col justify-between gap-3">
          <div className="grid grid-cols-12 gap-5 items-stretch">
            <div className="col-span-5 bg-white border border-[#002A41]/14 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between border-b border-[#002A41]/10 pb-2 mb-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold">
                    შემოთავაზებული მოდელი
                  </span>
                  <span className="text-[11.5px] text-[#5C6B77]">საწყისი კონცეფცია</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-2.5">
                  <div className="bg-[#F7F5F0] rounded p-2.5">
                    <div className="text-[10.5px] text-[#5C6B77]">სამიზნე ჯგუფი</div>
                    <div className="text-[15px] font-semibold text-[#002A41] tabular-nums">VII–XII კლასები</div>
                    <div className="text-[11px] text-[#4A5A66]">საჯარო და კერძო სკოლები</div>
                  </div>
                  <div className="bg-[#F7F5F0] rounded p-2.5">
                    <div className="text-[10.5px] text-[#5C6B77]">მონაწილეობა</div>
                    <div className="text-[15px] font-semibold text-[#002A41] tabular-nums">1–6 მოსწავლე</div>
                    <div className="text-[11px] text-[#4A5A66]">ინდივიდუალური და გუნდური</div>
                  </div>
                </div>

                <div className="text-[11.5px] font-semibold text-[#002A41] mb-1">
                  რატომ 1–6 მოსწავლის ფორმატი?
                </div>
                <ul className="space-y-1 text-[12px] text-[#374752] leading-snug">
                  <li>· გზას უხსნის როგორც ინდივიდუალურ გამომგონებლებს, ისე დიდ გუნდებს</li>
                  <li>· აყალიბებს სასკოლო სამეცნიერო გუნდებსა და მასწავლებელთა ჩართულობას</li>
                  <li>· ავრცელებს NVU-ის ცნობადობას მთელ სასკოლო გარემოში</li>
                </ul>
              </div>
            </div>

            <div className="col-span-7 bg-white border border-[#002A41]/14 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between border-b border-[#002A41]/10 pb-2 mb-2">
                  <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold">
                    შემოთავაზებული 6 მიმართულება
                  </span>
                  <span className="text-[11.5px] text-[#5C6B77]">
                    საბოლოოდ შეირჩევა NVU-ის პრიორიტეტებით
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                  {PROPOSED_DIRECTIONS.map((dir) => (
                    <div
                      key={dir.code}
                      className="flex items-start gap-2.5 py-1 border-b border-[#002A41]/8"
                    >
                      <span className="font-mono text-[12px] font-semibold text-[#00616F] tabular-nums pt-0.5">
                        {dir.code}
                      </span>
                      <div>
                        <div className="text-[12.5px] font-semibold text-[#002A41] leading-tight">
                          {dir.name}
                        </div>
                        <div className="text-[11px] text-[#5C6B77] leading-tight mt-0.5">
                          {dir.nvuAlignment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold mb-2">
              კონკურსის ხუთეტაპიანი ციკლი
            </div>
            <div className="grid grid-cols-5 gap-3">
              {CONTEST_STAGES.map((st, idx) => (
                <div
                  key={st.step}
                  className={`rounded-lg p-3.5 border ${
                    idx === 3
                      ? 'bg-[#002A41] text-white border-[#002A41]'
                      : 'bg-white text-[#142029] border-[#002A41]/14'
                  }`}
                >
                  <div
                    className={`font-mono text-[11px] font-semibold mb-1 tabular-nums ${
                      idx === 3 ? 'text-[#89C4CC]' : 'text-[#00616F]'
                    }`}
                  >
                    ეტაპი {st.step}
                  </div>
                  <div
                    className={`text-[13px] font-semibold leading-snug mb-1 ${
                      idx === 3 ? 'text-white' : 'text-[#002A41]'
                    }`}
                  >
                    {st.title}
                  </div>
                  <p
                    className={`text-[11.5px] leading-snug ${
                      idx === 3 ? 'text-white/80' : 'text-[#4A5A66]'
                    }`}
                  >
                    {st.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // SLIDE 5 — SCHOLARSHIPS & PATHWAY TO ENROLLMENT (compact flex fit, zero clipping)
  if (slideIndex === 4) {
    return (
      <div className="w-full h-full bg-[#FBF9F5] text-[#142029] flex flex-col overflow-hidden">
        <SlideHeader code={slide.code} title={slide.title} subtitle={slide.subtitle} />

        <div className="flex-1 min-h-0 px-14 py-4 flex flex-col justify-between gap-4">
          <div className="shrink-0 bg-[#002A41] rounded-lg p-4.5 text-white">
            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#89C4CC] mb-3">
              მოსწავლის განვითარების უწყვეტი გზა — სკოლიდან NVU-მდე
            </div>

            <div className="grid grid-cols-6 gap-2.5 items-stretch">
              {PATHWAY_NODES.map((node, idx) => (
                <div key={node.step} className="relative flex items-stretch">
                  <div
                    className={`w-full rounded-md p-3 border flex flex-col justify-between ${
                      idx === 5
                        ? 'bg-[#00616F] border-[#89C4CC]/50'
                        : 'bg-white/8 border-white/15'
                    }`}
                  >
                    <div className="font-mono text-[11px] text-[#89C4CC] tabular-nums mb-1">
                      0{node.step}
                    </div>
                    <div className="text-[13.5px] font-semibold leading-snug text-white">
                      {node.label}
                    </div>
                    <div className="text-[11px] text-white/75 mt-2 pt-1.5 border-t border-white/12">
                      {node.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-12 gap-5 items-stretch">
            <div className="col-span-6 bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-center">
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold mb-3">
                შემოთავაზებული მოტივაციისა და დაფინანსების კონცეფცია
              </div>
              <ul className="space-y-3 text-[13.5px] text-[#142029]">
                <li className="flex items-start gap-3">
                  <span className="font-mono text-[12px] text-[#00616F] pt-0.5">01</span>
                  <span>უნივერსიტეტში სწავლის სრული დაფინანსების შესაძლებლობა განსაკუთრებულად წარმატებული მონაწილეებისთვის</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-[12px] text-[#00616F] pt-0.5">02</span>
                  <span>ნაწილობრივი დაფინანსება, სტიპენდიები და საგანმანათლებლო შეღავათები სხვა გამარჯვებულებისთვის</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono text-[12px] text-[#00616F] pt-0.5">03</span>
                  <span>სამეცნიერო მენტორობა და უნივერსიტეტის კვლევით აქტივობებში ჩართვა</span>
                </li>
              </ul>
            </div>

            <div className="col-span-6 flex flex-col justify-between gap-3.5">
              <div className="bg-white border border-[#002A41]/14 rounded-lg p-4.5 flex-1 flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#8C6239] font-semibold mb-1.5">
                  მთავარი სტრატეგიული პრინციპი
                </div>
                <p className="text-[15px] font-semibold text-[#002A41] leading-snug mb-1.5">
                  ღირებულია არა მხოლოდ გამარჯვებული, არამედ კონკურსში მონაწილე ყველა დაინტერესებული მოსწავლე.
                </p>
                <p className="text-[12.5px] text-[#4A5A66] leading-snug">
                  მე-8 ან მე-9 კლასელი მონაწილე რამდენიმე წელში ირჩევს უნივერსიტეტს და უკვე იცნობს NVU-ის გარემოსა და ღირებულებებს.
                </p>
              </div>

              <div className="bg-[#F4F1EA] border border-[#002A41]/14 rounded-lg p-4">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#002A41] font-semibold mb-1">
                  მმართველობითი და სამართლებრივი დაზუსტება
                </div>
                <p className="text-[12.5px] text-[#374752] leading-snug">
                  ეს არის კონცეპტუალური წინადადება: დაფინანსების პირობებს, მოცულობასა და მიღების წინაპირობებს განსაზღვრავს NVU. გამარჯვება არ გულისხმობს ავტომატურ ჩარიცხვას.
                </p>
              </div>
            </div>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // SLIDE 6 — WHY WE CAN DELIVER THIS (restored previous text + concise 2-3 word re:school tag in grid)
  if (slideIndex === 5) {
    return (
      <div className="w-full h-full bg-[#FBF9F5] text-[#142029] flex flex-col overflow-hidden">
        <SlideHeader code={slide.code} title={slide.title} subtitle={slide.subtitle} />

        <div className="flex-1 min-h-0 px-14 py-4 flex flex-col justify-between gap-4">
          <div className="shrink-0 bg-[#002A41] text-white rounded-lg px-8 py-4">
            <p className="text-[18.5px] font-serif leading-snug text-white">
              „ჩვენ ამ კონკურსებს ვიცნობთ არა მხოლოდ ორგანიზატორის, არამედ მონაწილის, ფინალისტისა და გამარჯვებულის გამოცდილებიდან.“
            </p>
          </div>

          <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
            <div className="col-span-6 bg-white border border-[#002A41]/14 rounded-lg p-6 flex flex-col justify-between">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold mb-1.5">
                  ინიციატივის ავტორები
                </div>
                <h3 className="text-[22px] font-serif font-semibold text-[#002A41] mb-3">
                  ანრი ყუფარაძე და ნატა სულაქველიძე
                </h3>
                <p className="text-[14px] text-[#374752] leading-relaxed mb-4">
                  საქართველოში ჩატარებული სამეცნიერო და ინოვაციური კონკურსების მრავალგზის გამარჯვებულები და ფინალისტები — მოსწავლის, ფინალისტისა და გამარჯვებულის რეალური პრაქტიკული გამოცდილებით.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-[12.5px] text-[#142029]">
                <div className="bg-[#F7F5F0] rounded p-3">
                  სამეცნიერო პროექტების მომზადება და ეტაპების მექანიკა
                </div>
                <div className="bg-[#F7F5F0] rounded p-3">
                  ჟიურის შეფასების კრიტერიუმები და დაცვის მომზადება
                </div>
                <div className="bg-[#F7F5F0] rounded p-3">
                  მოსწავლეებისა და გუნდების პრაქტიკული მოტივაცია
                </div>
                <div className="bg-[#F7F5F0] rounded p-3 font-medium text-[#002A41]">
                  სწავლება re:school-ში
                </div>
              </div>
            </div>

            <div className="col-span-6 flex flex-col justify-between gap-4">
              <div className="bg-white border border-[#002A41]/14 rounded-lg p-5.5 flex-1 flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold mb-2">
                  საპროექტო და საორგანიზაციო კომპეტენცია
                </div>
                <h4 className="text-[17.5px] font-serif font-semibold text-[#002A41] mb-2">
                  პრაქტიკული გამოცდილება ინჟინერიასა და კვლევით პროექტებში
                </h4>
                <p className="text-[13.5px] text-[#374752] leading-relaxed">
                  გუნდს აქვს პრაქტიკული გამოცდილება ინჟინერიაში, პროტოტიპირებაში, ტექნოლოგიური და კვლევითი პროექტების სტრუქტურირებაში — იდეის ჩამოყალიბებიდან ფინალურ გამოფენაზე წარდგენამდე.
                </p>
              </div>

              <div className="bg-white border border-[#002A41]/14 rounded-lg p-5.5 flex-1 flex flex-col justify-center">
                <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#8C6239] font-semibold mb-2">
                  უნივერსიტეტთან თანამშრომლობის მოდელი
                </div>
                <div className="grid grid-cols-2 gap-4 text-[13px]">
                  <div>
                    <div className="font-semibold text-[#002A41] mb-1">NVU-ის როლი</div>
                    <p className="text-[#4A5A66] leading-snug">
                      აკადემიური მიმართულებები, პროფესორთა მენტორობა, კამპუსი და სტიპენდიების პოლიტიკა.
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold text-[#002A41] mb-1">ინიციატორთა როლი</div>
                    <p className="text-[#4A5A66] leading-snug">
                      კონკურსის მეთოდოლოგია, საორგანიზაციო კოორდინაცია და პროექტების მომზადების მხარდაჭერა.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SlideFooter />
      </div>
    );
  }

  // SLIDE 7 — 5-YEAR VISION & BOARD PROPOSAL (Dark NVU Navy closing)
  return (
    <div className="w-full h-full bg-[#002A41] text-white flex flex-col overflow-hidden">
      <SlideHeader
        code={slide.code}
        title={slide.title}
        subtitle={slide.subtitle}
        dark
      />

      <div className="flex-1 min-h-0 px-14 py-4 flex flex-col justify-between gap-3.5">
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-7 flex flex-col justify-between gap-4">
            <div className="bg-white/6 border border-white/15 rounded-lg p-5 flex-1 flex flex-col justify-between">
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#89C4CC] mb-3">
                სასურველი განვითარების ხუთწლიანი სცენარი
              </div>
              <div className="grid grid-cols-3 gap-4 flex-1">
                <div className="bg-white/6 border border-white/12 rounded p-4">
                  <div className="font-mono text-[12px] text-[#89C4CC] mb-1">წელი 01</div>
                  <div className="text-[15.5px] font-semibold text-white mb-1.5">დაფუძნება</div>
                  <p className="text-[12px] text-white/75 leading-snug">
                    პირველი სეზონი, სკოლებთან კავშირების გახსნა, მოსწავლეთა მონაწილეობა და ფინალური გამოფენა.
                  </p>
                </div>
                <div className="bg-white/6 border border-white/12 rounded p-4">
                  <div className="font-mono text-[12px] text-[#89C4CC] mb-1">წელი 02–03</div>
                  <div className="text-[15.5px] font-semibold text-white mb-1.5">გაფართოება</div>
                  <p className="text-[12px] text-white/75 leading-snug">
                    მეტი სკოლა, რეგიონული წარმომადგენლობის ზრდა და NVU-ის აკადემიური მენტორობის გაძლიერება.
                  </p>
                </div>
                <div className="bg-[#00616F] border border-[#89C4CC]/40 rounded p-4">
                  <div className="font-mono text-[12px] text-[#C8E4E8] mb-1">წელი 04–05</div>
                  <div className="text-[15.5px] font-semibold text-white mb-1.5">ეროვნული ბრენდი</div>
                  <p className="text-[12px] text-white/90 leading-snug">
                    საქართველოში ახალგაზრდა გამომგონებელთა წამყვანი ყოველწლიური საუნივერსიტეტო პლატფორმა.
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 bg-white/6 border border-white/15 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#89C4CC]">
                  გაზომვადი შედეგები (8 KPI · მონაცემთა დაცვის წესებით)
                </span>
                <span className="text-[11px] text-white/60">დაუდასტურებელი რიცხვების გარეშე</span>
              </div>
              <div className="grid grid-cols-4 gap-3 text-[12px] text-white/85">
                <div className="border-t border-white/15 pt-2">სკოლებისა და გუნდების რაოდენობა</div>
                <div className="border-t border-white/15 pt-2">რეგიონული წარმომადგენლობა</div>
                <div className="border-t border-white/15 pt-2">ფინალზე დასწრება და პროგრამული ინტერესი</div>
                <div className="border-t border-white/15 pt-2">შემდგომ წლებში NVU-ში განაცხადები</div>
              </div>
            </div>
          </div>

          <div className="col-span-5 bg-white text-[#142029] rounded-lg p-5.5 flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-[#00616F] font-semibold mb-1.5">
                შეთავაზება საბჭოსთვის (ბიუჯეტური ვალდებულების გარეშე)
              </div>
              <h3 className="text-[19.5px] font-serif font-semibold text-[#002A41] mb-3.5">
                ოთხი საწყისი ნაბიჯი
              </h3>

              <ol className="space-y-3 text-[13px]">
                <li className="flex items-start gap-3 pb-2.5 border-b border-[#002A41]/10">
                  <span className="font-mono font-semibold text-[#00616F] tabular-nums">01</span>
                  <span className="font-medium text-[#002A41]">
                    ინიციატივის კონცეპტუალური მხარდაჭერა
                  </span>
                </li>
                <li className="flex items-start gap-3 pb-2.5 border-b border-[#002A41]/10">
                  <span className="font-mono font-semibold text-[#00616F] tabular-nums">02</span>
                  <span className="font-medium text-[#002A41]">
                    უნივერსიტეტის მხრიდან საკონტაქტო წარმომადგენლების განსაზღვრა
                  </span>
                </li>
                <li className="flex items-start gap-3 pb-2.5 border-b border-[#002A41]/10">
                  <span className="font-mono font-semibold text-[#00616F] tabular-nums">03</span>
                  <span className="font-medium text-[#002A41]">
                    ერთობლივი სამუშაო ჯგუფის ჩამოყალიბება
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-mono font-semibold text-[#00616F] tabular-nums">04</span>
                  <span className="font-medium text-[#002A41]">
                    პირველი სეზონის დეტალური კონცეფციის მომზადება
                  </span>
                </li>
              </ol>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[#002A41]/12 text-[11.5px] text-[#4A5A66]">
              New Vision Innovation Challenge · 2026
            </div>
          </div>
        </div>

        <div className="shrink-0 pt-3 border-t border-white/15">
          <p className="text-[15.5px] font-serif text-[#E5F2F4] leading-snug">
            „ჩვენ გთავაზობთ შესაძლებლობას, რომ New Vision University გახდეს ადგილი, სადაც საქართველოს მომავალი მეცნიერები და გამომგონებლები პირველ მნიშვნელოვან ნაბიჯებს გადადგამენ.“
          </p>
        </div>
      </div>

      <SlideFooter dark />
    </div>
  );
};
