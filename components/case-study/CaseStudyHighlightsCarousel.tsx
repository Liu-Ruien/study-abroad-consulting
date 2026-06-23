"use client";

import { useLanguage } from "@/components/LanguageProvider";
import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  caseStudyGlassCard,
  caseStudySectionDarkLabel,
} from "@/lib/ui/card-system";

const pipelineLabels = {
  zh: ["Plan", "AI MVP", "多语言", "Portfolio"],
  ja: ["Plan", "AI MVP", "多言語", "Portfolio"],
  en: ["Plan", "AI MVP", "Multilingual", "Portfolio"],
};

export default function CaseStudyHighlightsCarousel({
  content,
}: {
  content: CaseStudyContent["highlights"];
  embedded?: boolean;
}) {
  const { language } = useLanguage();
  const currentPipelineLabels = pipelineLabels[language];

  return (
    <section className="w-full overflow-hidden" aria-label={content.title}>
      <div className="mx-auto max-w-4xl text-center">
        <p className={caseStudySectionDarkLabel}>{content.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {content.title}
        </h2>
      </div>

      <div className="mt-9 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.cards.map((card, index) => (
          <article
            key={card.title}
            className={`group relative min-w-0 overflow-hidden p-5 hover:-translate-y-1 ${caseStudyGlassCard}`}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-300/40 via-indigo-300/25 to-transparent"
              aria-hidden
            />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-300/80">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-8 text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
              {card.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {card.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-8 hidden max-w-3xl items-center justify-center lg:flex">
        {currentPipelineLabels.map((label, index) => (
          <div key={label} className="flex items-center">
            <span className="rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-xs font-medium text-slate-300 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl">
              {label}
            </span>
            {index < currentPipelineLabels.length - 1 && (
              <span
                className="h-px w-12 bg-gradient-to-r from-sky-300/45 to-indigo-300/20"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
