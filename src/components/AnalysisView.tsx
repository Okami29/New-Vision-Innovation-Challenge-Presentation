import React from 'react';
import {
  CONTEST_COMPARISONS,
  GEORGIA_SCHOOL_SCALE,
  KPI_METRICS,
  NVU_STRATEGIC_PILLARS,
} from '../data/presentationData';
import { ExternalLink } from 'lucide-react';

export const AnalysisView: React.FC = () => {
  return (
    <div className="max-w-[1160px] mx-auto px-6 py-10 space-y-12">
      {/* Section 1: Comparative Analysis & Real Participant Numbers */}
      <section>
        <div className="border-b border-[#002A41]/15 pb-6 mb-8">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-2">
            დანართი 01 · შედარებითი კვლევა და რეალური სტატისტიკა
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-[#002A41] leading-tight max-w-3xl text-balance">
            მონაწილეთა რაოდენობა და მასშტაბი საქართველოს სამეცნიერო კონკურსებში
          </h1>
          <p className="text-[15px] text-[#4A5A66] mt-3 max-w-2xl leading-relaxed">
            ოფიციალურ წყაროებზე დაყრდნობით მოძიებული ფაქტობრივი რიცხვები აჩვენებს, რამდენად დიდია სკოლის მოსწავლეებში STEM და კვლევითი კონკურსების მიმართ ინტერესი საქართველოში.
          </p>
        </div>

        {/* Geostat Macro Scale Summary */}
        <div className="bg-[#002A41] text-white rounded-lg p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#89C4CC]">
              საქართველოს ზოგადსაგანმანათლებლო მასშტაბი
            </span>
            <span className="text-xs font-mono text-white/70">
              {GEORGIA_SCHOOL_SCALE.sourceLabel}
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-mono font-semibold tabular-nums">
                {GEORGIA_SCHOOL_SCALE.totalSchools}
              </div>
              <div className="text-xs text-[#C8E4E8] mt-1">
                სკოლა ({GEORGIA_SCHOOL_SCALE.publicSchools} საჯარო · {GEORGIA_SCHOOL_SCALE.privateSchools} კერძო)
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-semibold tabular-nums">
                {GEORGIA_SCHOOL_SCALE.totalStudents}
              </div>
              <div className="text-xs text-[#C8E4E8] mt-1">მოსწავლე ქვეყნის მასშტაბით</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-semibold tabular-nums">
                {GEORGIA_SCHOOL_SCALE.regionsShare}
              </div>
              <div className="text-xs text-[#C8E4E8] mt-1">რეგიონებში მცხოვრები მოსწავლეები</div>
            </div>
            <div>
              <div className="text-3xl font-mono font-semibold tabular-nums">
                {GEORGIA_SCHOOL_SCALE.tbilisiShare}
              </div>
              <div className="text-xs text-[#C8E4E8] mt-1">თბილისში მცხოვრები მოსწავლეები</div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white border border-[#002A41]/14 rounded-lg overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse min-w-[820px]">
            <thead>
              <tr className="bg-[#002A41] text-white text-xs font-mono uppercase tracking-wider">
                <th className="py-4 px-5 font-medium">კონკურსი</th>
                <th className="py-4 px-5 font-medium">მონაწილეთა და პროექტების რიცხვები</th>
                <th className="py-4 px-5 font-medium">სამიზნე ჯგუფი და ფორმატი</th>
                <th className="py-4 px-5 font-medium">მთავარი ძლიერი მხარე</th>
                <th className="py-4 px-5 font-medium">სტატუსი</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#002A41]/10 text-sm">
              {CONTEST_COMPARISONS.map((c) => (
                <tr key={c.id} className="hover:bg-[#FBF9F5] transition-colors align-top">
                  <td className="py-4 px-5">
                    <div className="font-serif font-semibold text-[#002A41]">{c.name}</div>
                    <div className="text-xs text-[#5C6B77] mt-1">{c.organizer}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="font-mono font-semibold text-[#002A41] tabular-nums">
                      {c.headlineNumber}
                    </div>
                    <div className="text-xs text-[#374752] mt-0.5">{c.headlineNumberLabel}</div>
                    <div className="font-mono text-xs font-medium text-[#00616F] mt-2 tabular-nums">
                      {c.secondaryNumber}
                    </div>
                    <div className="text-[11.5px] text-[#5C6B77]">{c.secondaryNumberLabel}</div>
                  </td>
                  <td className="py-4 px-5 text-[#374752]">
                    <div>{c.targetGroup}</div>
                    <div className="text-xs text-[#5C6B77] mt-1">{c.participationFormat}</div>
                  </td>
                  <td className="py-4 px-5 text-[#142029]">{c.coreStrength}</td>
                  <td className="py-4 px-5 text-xs font-medium text-[#00616F]">
                    {c.statusNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CONTEST_COMPARISONS.map((contest, idx) => (
            <div
              key={contest.id}
              className="bg-white border border-[#002A41]/14 rounded-lg p-6 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#00616F] font-semibold mb-2">
                  0{idx + 1} · {contest.statusNote}
                </div>
                <h2 className="text-xl font-serif font-semibold text-[#002A41] mb-1">
                  {contest.name}
                </h2>
                <p className="text-xs text-[#5C6B77] mb-4">{contest.organizer}</p>

                <div className="bg-[#F7F5F0] border border-[#002A41]/10 rounded-md p-3.5 mb-4">
                  <div className="text-2xl font-mono font-semibold text-[#002A41] tabular-nums">
                    {contest.headlineNumber}
                  </div>
                  <div className="text-xs text-[#4A5A66] mt-0.5">
                    {contest.headlineNumberLabel}
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-[#374752] leading-relaxed mb-5">
                  {contest.keyFacts.map((fact, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <span className="text-[#00616F] font-mono text-xs pt-1">·</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#002A41]/10 space-y-3">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8C6239] font-semibold mb-1">
                    რა ელემენტი გადმოდის NVU-ში
                  </div>
                  <p className="text-sm text-[#002A41] font-medium leading-snug">
                    {contest.lessonForNVU}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 pt-1">
                  {contest.officialUrls.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#00616F] hover:underline"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: NVU Strategic Alignment */}
      <section className="pt-4 border-t border-[#002A41]/15">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-2">
            დანართი 02 · ინსტიტუციური შესაბამისობა
          </div>
          <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-[#002A41]">
            თანხვედრა New Vision University-ის მისიასა და 2025–2031 წლების სტრატეგიასთან
          </h2>
          <p className="text-[15px] text-[#4A5A66] mt-2 max-w-3xl leading-relaxed">
            კონკურსი არ განიხილება როგორც იზოლირებული აქტივობა — ის წარმოადგენს უნივერსიტეტის უკვე არსებული კვლევითი, საგანმანათლებლო და სოციალური მისიის პრაქტიკულ გაგრძელებას.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NVU_STRATEGIC_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="bg-white border border-[#002A41]/14 rounded-lg p-6"
            >
              <div className="font-mono text-xs text-[#00616F] font-semibold mb-2">
                0{idx + 1} · სტრატეგიული საყრდენი
              </div>
              <h3 className="text-lg font-serif font-semibold text-[#002A41] mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-[#374752] leading-relaxed">{pillar.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Measurable KPIs */}
      <section className="pt-4 border-t border-[#002A41]/15">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-2">
            დანართი 03 · ეფექტიანობის შეფასება
          </div>
          <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-[#002A41]">
            შედეგების შეფასების 8 გაზომვადი მაჩვენებელი
          </h2>
          <p className="text-[15px] text-[#4A5A66] mt-2 max-w-3xl leading-relaxed">
            საბჭოსთვის ინიციატივის ეფექტიანობა ფასდება ობიექტური, წინასწარ გაუყალბებელი მონაცემებით. ამ ეტაპზე არ არის გამოყენებული გამოგონილი კონვერსიის პროცენტები ან ბიუჯეტური გათვლები.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {KPI_METRICS.map((kpi, idx) => (
            <div
              key={kpi.id}
              className="bg-white border border-[#002A41]/14 rounded-lg p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#5C6B77] mb-2">
                  <span className="text-[#00616F] font-semibold tabular-nums">
                    KPI 0{idx + 1}
                  </span>
                  <span>{kpi.timeframe}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#002A41] leading-snug mb-2">
                  {kpi.metric}
                </h3>
                <p className="text-xs text-[#4A5A66] leading-relaxed">{kpi.description}</p>
              </div>
              <div className="mt-4 pt-2.5 border-t border-[#002A41]/8 text-[11px] text-[#5C6B77]">
                {kpi.category}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-[#F4F1EA] border border-[#002A41]/14 rounded-lg p-5 text-sm text-[#374752] leading-relaxed">
          <strong className="text-[#002A41]">პერსონალურ მონაცემთა დაცვის სტანდარტი:</strong>{' '}
          მოსწავლეთა მონაცემების შეგროვება, დამუშავება და უნივერსიტეტის პროგრამების შესახებ შემდგომი კომუნიკაცია განხორციელდება მხოლოდ შესაბამისი თანხმობის (მათ შორის მშობლის/კანონიერი წარმომადგენლის თანხმობის) და პერსონალურ მონაცემთა დაცვის კანონმდებლობის სრული დაცვით.
        </div>
      </section>
    </div>
  );
};
