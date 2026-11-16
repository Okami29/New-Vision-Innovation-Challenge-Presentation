import React, { useState } from 'react';
import { BOARD_QA, OFFICIAL_SOURCES } from '../data/presentationData';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export const QaSourcesView: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>(BOARD_QA.map((q) => q.id));
  const [selectedCategory, setSelectedCategory] = useState<string>('ყველა');

  const categories = ['ყველა', ...Array.from(new Set(BOARD_QA.map((q) => q.category)))];

  const filteredQuestions =
    selectedCategory === 'ყველა'
      ? BOARD_QA
      : BOARD_QA.filter((q) => q.category === selectedCategory);

  const toggleId = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-[1160px] mx-auto px-6 py-10 space-y-12">
      {/* Board Q&A */}
      <section>
        <div className="border-b border-[#002A41]/15 pb-6 mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-2">
            მომზადება კითხვა-პასუხისთვის · Q&A
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif font-semibold text-[#002A41] leading-tight max-w-3xl text-balance">
            საბჭოს სავარაუდო შეკითხვები და მომზადებული პასუხები
          </h1>
          <p className="text-[15px] text-[#4A5A66] mt-3 max-w-2xl leading-relaxed">
            ათი საკვანძო კითხვა, რომლებიც შეიძლება დაისვას უნივერსიტეტის ხელმძღვანელობის მხრიდან პრეზენტაციის შემდეგ — სტრატეგიულ მიზანშეწონილობაზე, მართვაზე, შედეგების გაზომვასა და დაფინანსების ჩარჩოზე.
          </p>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EBE6DF] rounded-lg">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-[#002A41] shadow-sm'
                      : 'text-[#4A5A66] hover:text-[#002A41]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setOpenIds(BOARD_QA.map((q) => q.id))}
                className="px-3 py-1.5 text-xs font-medium text-[#002A41] bg-white border border-[#002A41]/15 rounded-md hover:bg-[#F7F5F0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                ყველას გაშლა
              </button>
              <button
                onClick={() => setOpenIds([])}
                className="px-3 py-1.5 text-xs font-medium text-[#4A5A66] bg-white border border-[#002A41]/15 rounded-md hover:bg-[#F7F5F0] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                ჩაკეცვა
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredQuestions.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-[#002A41]/14 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleId(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 hover:bg-[#FBF9F5] transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2.5 text-xs font-mono text-[#00616F] font-semibold mb-1 tabular-nums">
                      <span>კითხვა {String(item.id).padStart(2, '0')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#5C6B77] font-sans font-normal">
                        {item.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-serif font-semibold text-[#002A41] leading-snug">
                      {item.question}
                    </h2>
                  </div>
                  <span className="shrink-0 mt-1 text-[#002A41]">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 border-t border-[#002A41]/8">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#8C6239] font-semibold mt-3 mb-1.5">
                      მთავარი პოზიცია: {item.keyPoint}
                    </div>
                    <p className="text-[15px] text-[#142029] leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Official Sources Registry */}
      <section className="pt-6 border-t border-[#002A41]/15">
        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-[0.14em] text-[#00616F] mb-2">
            გამოყენებული მასალები
          </div>
          <h2 className="text-2xl lg:text-3xl font-serif font-semibold text-[#002A41]">
            ოფიციალური წყაროების ჩამონათვალი
          </h2>
          <p className="text-sm text-[#4A5A66] mt-2 max-w-2xl">
            პრეზენტაციაში გამოყენებული ყველა ფაქტობრივი ცნობა და უნივერსიტეტის ბრენდინგის ელემენტი გადამოწმებულია ოფიციალურ ვებგვერდებზე.
          </p>
        </div>

        <div className="bg-white border border-[#002A41]/14 rounded-lg divide-y divide-[#002A41]/10">
          {OFFICIAL_SOURCES.map((src, idx) => (
            <div
              key={src.id}
              className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5C6B77] mb-1">
                  <span className="text-[#00616F] font-semibold tabular-nums">
                    0{idx + 1}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{src.organization}</span>
                </div>
                <h3 className="text-[15px] font-semibold text-[#002A41]">{src.title}</h3>
                <p className="text-xs text-[#4A5A66] mt-1 leading-relaxed">
                  {src.usageNote}
                </p>
              </div>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#002A41] bg-[#F7F5F0] hover:bg-[#EBE6DF] border border-[#002A41]/12 rounded-md transition-colors whitespace-nowrap shrink-0 self-start md:self-center"
              >
                <span>წყაროს გახსნა</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
