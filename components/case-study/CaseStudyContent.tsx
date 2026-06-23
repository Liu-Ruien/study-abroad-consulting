"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import {
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintRose,
  cardTintSky,
  caseStudyModule,
  caseStudyModuleIndigo,
  caseStudyModuleRose,
  caseStudySectionLabel,
  pageBackground,
  tagApple,
} from "@/lib/ui/card-system";
import { caseStudyContent } from "@/lib/case-study-i18n";
import ArchitectureShowcase from "@/components/case-study/ArchitectureShowcase";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import DarkFeatureSection from "@/components/case-study/DarkFeatureSection";

const featureToneClasses = [
  cardTintSky,
  cardTintIndigo,
  cardTintRose,
  caseStudyModuleIndigo,
];

const architectureToneClasses = [
  cardTintSky,
  cardTintIndigo,
  caseStudyModuleRose,
  caseStudyModule,
];

function SectionHeading({
  eyebrow,
  title,
  description,
  compact,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={`text-center ${compact ? "mb-10 md:mb-12" : "mb-12 md:mb-16"}`}
    >
      <p className={caseStudySectionLabel}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function ContentCard({
  title,
  children,
  toneClass = caseStudyModule,
}: {
  title: string;
  children: ReactNode;
  toneClass?: string;
}) {
  return (
    <div className={`rounded-3xl p-7 sm:p-9 ${toneClass} ${cardHover}`}>
      <h3 className="text-xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-2xl">
        {title}
      </h3>
      <div className="mt-5 space-y-4 text-sm leading-relaxed text-gray-700 sm:text-base">
        {children}
      </div>
    </div>
  );
}

function SectionBlock({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-4 sm:py-6 lg:py-8 ${className}`}>{children}</section>
  );
}

export default function CaseStudyContent() {
  const { language } = useLanguage();
  const content = caseStudyContent[language];

  return (
    <main className={`overflow-x-hidden text-gray-950 ${pageBackground}`}>
      <CaseStudyHero content={content.hero} />
      <DarkFeatureSection content={content.darkFeature} />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-20 sm:px-6 sm:space-y-28 sm:py-28 lg:space-y-32 lg:py-32">
        <SectionBlock>
          <SectionHeading
            eyebrow={content.interviewerFocus.eyebrow}
            title={content.interviewerFocus.title}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
            {content.interviewerFocus.cards.map((card, index) => (
              <div
                key={card.title}
                className={`min-w-0 rounded-3xl p-7 sm:p-8 ${featureToneClasses[index]} ${cardHover}`}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-950 sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.background.eyebrow}
            title={content.background.title}
            compact
          />
          <ContentCard title={content.background.cardTitle} toneClass={caseStudyModule}>
            <p>{content.background.paragraphs[0]}</p>
            <p>{content.background.paragraphs[1]}</p>
          </ContentCard>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.features.eyebrow}
            title={content.features.title}
            description={content.features.description}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:gap-7">
            {content.features.cards.map((card, index) => (
              <div
                key={card.title}
                className={`min-w-0 rounded-3xl p-7 sm:p-8 ${featureToneClasses[index]} ${cardHover}`}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-950 sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.technicalDecisions.eyebrow}
            title={content.technicalDecisions.title}
            description={content.technicalDecisions.description}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
            {content.technicalDecisions.items.map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl p-6 sm:p-7 ${cardTintSky} ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-4">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.myRole.eyebrow}
            title={content.myRole.title}
            compact
          />
          <div
            className={`mx-auto max-w-4xl rounded-3xl p-7 sm:p-9 ${caseStudyModuleIndigo}`}
          >
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
              {content.myRole.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-gray-700 sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.stack.eyebrow}
            title={content.stack.title}
            compact
          />
          <div
            className={`mx-auto max-w-4xl rounded-3xl p-8 sm:p-10 ${caseStudyModuleIndigo}`}
          >
            <div className="flex flex-wrap justify-center gap-3">
              {content.stack.items.map((item) => (
                <span key={item} className={tagApple}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.engineering.eyebrow}
            title={content.engineering.title}
            description={content.engineering.description}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
            {content.engineering.items.map((item) => (
              <div
                key={item.title}
                className={`rounded-3xl p-6 sm:p-7 ${cardInfo} ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading
            eyebrow={content.architecture.eyebrow}
            title={content.architecture.title}
            description={content.architecture.description}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {content.architecture.layers.map((layer, index) => (
              <div
                key={layer.label}
                className={`rounded-3xl p-6 sm:p-7 ${architectureToneClasses[index]} ${cardHover}`}
              >
                <p className={caseStudySectionLabel}>{layer.label}</p>
                <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-gray-950">
                  {layer.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-600">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionBlock>

        <ArchitectureShowcase content={content.architectureShowcase} />

        <SectionBlock>
          <SectionHeading
            eyebrow={content.capabilities.eyebrow}
            title={content.capabilities.title}
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {content.capabilities.items.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-3xl p-6 sm:p-7 ${
                  index === 4 ? caseStudyModuleRose : cardInfo
                } ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug tracking-tight text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <ContentCard title={content.boundaries.title} toneClass={caseStudyModuleRose}>
              <ul className="space-y-2.5">
                {content.boundaries.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            <ContentCard title={content.future.title} toneClass={caseStudyModuleIndigo}>
              <ul className="space-y-2.5">
                {content.future.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>
          </div>
        </SectionBlock>

        <section className="pb-8 text-center">
          <div
            className={`mx-auto max-w-2xl rounded-[2rem] px-8 py-12 sm:px-12 sm:py-16 ${cardHero}`}
          >
            <p className={caseStudySectionLabel}>{content.status.eyebrow}</p>
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl">
              {content.status.title}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-gray-600 sm:text-base">
              {content.status.body}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
