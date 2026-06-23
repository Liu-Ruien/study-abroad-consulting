"use client";

import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  cardHover,
  caseStudyArchFlowNode,
  caseStudyArchLayer,
  caseStudySectionLabel,
  pageBackground,
} from "@/lib/ui/card-system";

const layerAccents = [
  "from-sky-500/20 to-sky-500/5",
  "from-indigo-500/20 to-indigo-500/5",
  "from-violet-500/20 to-violet-500/5",
  "from-slate-500/20 to-slate-500/5",
];

function ArchitectureFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="mx-auto mt-16 flex max-w-lg flex-col items-center lg:mt-20">
      {nodes.map((node, index) => (
        <div key={node} className="flex w-full flex-col items-center">
          <div
            className={`w-full sm:min-w-[18rem] lg:min-w-[20rem] ${caseStudyArchFlowNode} ${index === 0 ? "ring-1 ring-sky-200/40" : ""}`}
          >
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-500/80">
              {String(index).padStart(2, "0")}
            </span>
            <p className="mt-1 text-base sm:text-lg">{node}</p>
          </div>
          {index < nodes.length - 1 && (
            <div className="flex flex-col items-center py-3" aria-hidden>
              <span className="h-8 w-px bg-gradient-to-b from-transparent via-sky-200/70 to-transparent" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ArchitectureShowcase({
  content,
}: {
  content: CaseStudyContent["architectureShowcase"];
}) {
  return (
    <section
      className={`rounded-[2rem] px-4 py-16 sm:px-8 sm:py-20 lg:rounded-[2.5rem] lg:py-24 ${pageBackground}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center md:mb-16">
          <p className={caseStudySectionLabel}>{content.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-6">
          {content.cards.map((card, index) => (
            <div
              key={card.labelEn}
              className={`relative flex min-w-0 flex-col overflow-hidden p-6 sm:p-7 ${caseStudyArchLayer} ${cardHover}`}
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${layerAccents[index]}`}
                aria-hidden
              />
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-sky-600">
                {card.labelEn}
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-gray-950">
                {card.label}
              </h3>
              <ul className="mt-5 flex-1 space-y-2.5 border-t border-sky-100/60 pt-5 text-sm leading-relaxed text-gray-600">
                {card.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <ArchitectureFlow nodes={content.flowNodes} />

        <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-gray-500 sm:text-base">
          {content.flowCaption}
        </p>
      </div>
    </section>
  );
}
