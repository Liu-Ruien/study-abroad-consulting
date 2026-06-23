"use client";

import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  cardHover,
  caseStudyArchFlowNode,
  caseStudyArchLayer,
  caseStudySectionLabel,
} from "@/lib/ui/card-system";

function ArchitectureFlow({
  nodes,
  compact,
}: {
  nodes: string[];
  compact?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${compact ? "mt-6 lg:mt-8" : "mt-14 lg:mt-16"}`}
    >
      <div className="grid gap-3 md:grid-cols-5 md:items-center">
        {nodes.map((node, index) => (
          <div key={node} className="relative flex min-w-0 flex-col items-center">
            <div
              className={`relative z-10 w-full ${caseStudyArchFlowNode} sm:min-w-0 ${
                compact ? "px-3 py-3" : "px-5 py-4"
              }`}
            >
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-sky-300/80">
                {String(index).padStart(2, "0")}
              </span>
              <p className={`mt-1 leading-snug ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}>
                {node}
              </p>
            </div>
            {index < nodes.length - 1 && (
              <span
                className="hidden md:block pointer-events-none absolute left-[calc(50%+2rem)] top-1/2 h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-sky-300/45 via-indigo-300/35 to-transparent"
                aria-hidden
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ArchitectureShowcase({
  content,
  compact = false,
}: {
  content: CaseStudyContent["architectureShowcase"];
  compact?: boolean;
}) {
  return (
    <>
      <div className={`text-center ${compact ? "mb-6 md:mb-7" : "mb-12 md:mb-16"}`}>
        <p className={caseStudySectionLabel}>{content.eyebrow}</p>
        <h2 className={`mt-3 font-semibold leading-snug tracking-tight text-white ${compact ? "text-3xl sm:text-4xl" : "text-3xl sm:text-4xl lg:text-[2.75rem]"}`}>
          {content.title}
        </h2>
        <p className={`mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400 ${compact ? "text-sm" : "text-sm sm:text-base"}`}>
          {content.description}
        </p>
      </div>

      <div
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${compact ? "lg:grid-cols-4 lg:gap-4" : "gap-6 lg:grid-cols-4 lg:gap-6"}`}
      >
        {content.cards.map((card) => (
          <div
            key={card.labelEn}
              className={`relative flex min-w-0 flex-col overflow-hidden ${compact ? "p-4 sm:p-5" : "p-6 sm:p-7"} ${caseStudyArchLayer} ${cardHover}`}
          >
            <div
              className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent`}
              aria-hidden
            />
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-300">
              {card.labelEn}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
              {card.label}
            </h3>
            <ul
              className={`mt-3 flex-1 space-y-1.5 border-t border-white/10 pt-3 leading-relaxed text-slate-300 ${compact ? "text-xs" : "text-sm"}`}
            >
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ArchitectureFlow nodes={content.flowNodes} compact={compact} />

      <p
        className={`mx-auto max-w-xl text-center leading-relaxed text-slate-300 ${compact ? "mt-5 text-xs sm:text-sm" : "mt-14 text-sm sm:text-base"}`}
      >
        {content.flowCaption}
      </p>
    </>
  );
}
