"use client";

import { RevealSection } from "@/components/sections/reveal-section";
import { careerDataByLocale } from "@/data/career";
import { uiTextByLocale } from "@/data/ui-text";
import { useLocale } from "@/lib/locale";

const formatYearMonth = (year: number, month: number) =>
  `${year}.${month.toString().padStart(2, "0")}`;

// ========== Career セクション（年表） ==========
export function CareerSection() {
  const { locale } = useLocale();
  const t = uiTextByLocale[locale];
  const careerData = careerDataByLocale[locale];

  return (
    <RevealSection id="career">
      <h2 className="text-xl font-bold text-neutral-900 mb-6 border-b border-neutral-200 pb-2 inline-block">
        {t.careerTitle}
      </h2>
      <div className="space-y-8 border-l border-neutral-200 ml-20 sm:ml-28">
        {careerData.map((item) => (
          <div key={item.id} className="relative pl-5 sm:pl-8">
            {/* ================= 年月表記 (左側) ================= */}
            <div className="absolute top-0 right-full pr-4 sm:pr-6 w-24 sm:w-28 text-right">
              <span className="text-sm font-mono text-neutral-500 tracking-tight">
                {formatYearMonth(item.year, item.month)}
              </span>
              {item.current && (
                <span className="block text-xs font-medium text-blue-500 font-mono mt-0.5">
                  Present
                </span>
              )}
              {item.end && (
                <span className="block text-xs text-neutral-400 font-mono mt-0.5">
                  – {formatYearMonth(item.end.year, item.end.month)}
                </span>
              )}
            </div>

            {/* ================= タイムラインの点 (中央) ================= */}
            <div
              className={`absolute w-3 h-3 rounded-full -left-[6px] top-1.5 ring-4 ring-zinc-50 ${item.current ? "bg-blue-500" : "bg-neutral-300"}`}
            />

            {/* ================= コンテンツ (右側) ================= */}
            <h3 className="text-lg font-medium text-neutral-900 leading-snug">
              {item.title}
            </h3>
            {item.role && (
              <p className="text-sm text-neutral-600 mt-1">{item.role}</p>
            )}
          </div>
        ))}
      </div>
    </RevealSection>
  );
}
