"use client";

import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  cardHover,
  cardTintIndigo,
  cardTintSky,
  caseStudyModule,
  caseStudyModuleIndigo,
} from "@/lib/ui/card-system";

const layerToneClasses = [
  cardTintSky,
  cardTintIndigo,
  caseStudyModuleIndigo,
  caseStudyModule,
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-10 text-center md:mb-12">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function ArchitectureFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="mx-auto mt-12 flex max-w-md flex-col items-center">
      {nodes.map((node, index) => (
        <div key={node} className="flex w-full flex-col items-center">
          <div
            className={`w-full max-w-xs px-6 py-3.5 text-center text-sm font-medium text-gray-800 sm:text-base ${cardTintSky} ${index === 0 ? "ring-1 ring-sky-200/60" : ""}`}
          >
            {node}
          </div>
          {index < nodes.length - 1 && (
            <div
              className="flex flex-col items-center py-2 text-sky-300/90"
              aria-hidden
            >
              <span className="h-5 w-px bg-gradient-to-b from-sky-200 to-sky-300/80" />
              <span className="text-xs leading-none text-sky-400">↓</span>
              <span className="h-5 w-px bg-gradient-to-b from-sky-300/80 to-sky-200" />
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
    <section className="py-2">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-5">
        {content.cards.map((card, index) => (
          <div
            key={card.labelEn}
            className={`flex min-w-0 flex-col p-5 sm:p-6 ${layerToneClasses[index]} ${cardHover}`}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-sky-600 sm:text-xs">
              {card.labelEn}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-gray-950">
              {card.label}
            </h3>
            <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-gray-700">
              {card.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-sky-400/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ArchitectureFlow nodes={content.flowNodes} />

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-gray-600 sm:text-base">
        {content.flowCaption}
      </p>
    </section>
  );
}
