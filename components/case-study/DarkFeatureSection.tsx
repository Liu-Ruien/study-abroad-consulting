"use client";

import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  caseStudyDarkCard,
  caseStudyDarkCardHover,
  caseStudyDarkSection,
  caseStudySectionDarkLabel,
} from "@/lib/ui/card-system";

export default function DarkFeatureSection({
  content,
}: {
  content: CaseStudyContent["darkFeature"];
}) {
  return (
    <section className={`${caseStudyDarkSection} py-24 sm:py-28 lg:py-36`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className={caseStudySectionDarkLabel}>{content.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-semibold leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-20 lg:gap-8">
          {content.cards.map((card) => (
            <div
              key={card.title}
              className={`${caseStudyDarkCard} ${caseStudyDarkCardHover}`}
            >
              <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
