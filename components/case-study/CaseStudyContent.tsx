"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import {
  badgeSoft,
  btnPrimary,
  btnSecondary,
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintRose,
  cardTintSky,
  caseStudyModule,
  caseStudyModuleIndigo,
  caseStudyModuleRose,
  pageBackground,
  tagApple,
} from "@/lib/ui/card-system";
import {
  caseStudyContent,
} from "@/lib/case-study-i18n";
import ArchitectureShowcase from "@/components/case-study/ArchitectureShowcase";

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
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 text-center md:mb-10">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
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
    <div className={`p-6 sm:p-8 ${toneClass} ${cardHover}`}>
      <h3 className="text-xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-2xl">
        {title}
      </h3>
      <div className="mt-4 text-sm leading-relaxed text-gray-700 sm:text-base">
        {children}
      </div>
    </div>
  );
}

export default function CaseStudyContent() {
  const { language } = useLanguage();
  const content = caseStudyContent[language];

  return (
    <main
      className={`min-h-screen overflow-x-hidden text-gray-950 ${pageBackground}`}
    >
      <section className="px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14 lg:pb-20 lg:pt-16">
        <div
          className={`relative mx-auto max-w-5xl overflow-hidden px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12 lg:py-16 ${cardHero}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(186,230,253,0.32),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(221,214,254,0.20),transparent_38%)]" />

          <div className="relative">
            <p className={`mb-5 inline-flex sm:px-4 sm:py-1.5 ${badgeSoft}`}>
              {content.hero.badge}
            </p>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
              {content.hero.tags.map((tag) => (
                <span key={tag} className={tagApple}>
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-[2rem] font-semibold leading-[1.06] tracking-[-0.055em] text-gray-950 sm:text-5xl md:text-6xl">
              {content.hero.title}
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-gray-600 sm:mt-6 sm:text-base lg:text-lg">
              {content.hero.subtitle}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row">
              <Link
                href="/plan"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-medium ${btnPrimary}`}
              >
                {content.hero.ctaPlan}
              </Link>
              <Link
                href="/ai"
                className={`inline-flex rounded-full px-6 py-3 text-sm font-medium ${btnSecondary}`}
              >
                {content.hero.ctaAi}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 pb-20 sm:px-6 sm:pb-24 lg:space-y-20">
        <section>
          <SectionHeading
            eyebrow={content.interviewerFocus.eyebrow}
            title={content.interviewerFocus.title}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {content.interviewerFocus.cards.map((card, index) => (
              <div
                key={card.title}
                className={`min-w-0 p-6 sm:p-7 ${featureToneClasses[index]} ${cardHover}`}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-950 sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.background.eyebrow}
            title={content.background.title}
          />
          <ContentCard title={content.background.cardTitle} toneClass={caseStudyModule}>
            <p>{content.background.paragraphs[0]}</p>
            <p className="mt-4">{content.background.paragraphs[1]}</p>
          </ContentCard>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.features.eyebrow}
            title={content.features.title}
            description={content.features.description}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {content.features.cards.map((card, index) => (
              <div
                key={card.title}
                className={`min-w-0 p-6 sm:p-7 ${featureToneClasses[index]} ${cardHover}`}
              >
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-gray-950 sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.technicalDecisions.eyebrow}
            title={content.technicalDecisions.title}
            description={content.technicalDecisions.description}
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {content.technicalDecisions.items.map((item) => (
              <div
                key={item.title}
                className={`p-5 sm:p-6 ${cardTintSky} ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.myRole.eyebrow}
            title={content.myRole.title}
          />
          <div className={`mx-auto max-w-4xl p-6 sm:p-8 ${caseStudyModuleIndigo}`}>
            <ul className="space-y-2.5 text-sm leading-relaxed text-gray-700 sm:text-base">
              {content.myRole.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.stack.eyebrow}
            title={content.stack.title}
          />
          <div
            className={`mx-auto max-w-4xl p-6 sm:p-8 ${caseStudyModuleIndigo}`}
          >
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {content.stack.items.map((item) => (
                <span key={item} className={tagApple}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.engineering.eyebrow}
            title={content.engineering.title}
            description={content.engineering.description}
          />
          <div className="grid gap-4 md:grid-cols-2 md:gap-5">
            {content.engineering.items.map((item) => (
              <div
                key={item.title}
                className={`p-5 sm:p-6 ${cardInfo} ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow={content.architecture.eyebrow}
            title={content.architecture.title}
            description={content.architecture.description}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {content.architecture.layers.map((layer, index) => (
              <div
                key={layer.label}
                className={`p-5 sm:p-6 ${architectureToneClasses[index]} ${cardHover}`}
              >
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-sky-600">
                  {layer.label}
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-gray-950">
                  {layer.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-gray-700">
                  {layer.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <ArchitectureShowcase content={content.architectureShowcase} />

        <section>
          <SectionHeading
            eyebrow={content.capabilities.eyebrow}
            title={content.capabilities.title}
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {content.capabilities.items.map((item, index) => (
              <div
                key={item.title}
                className={`p-5 sm:p-6 ${
                  index === 4 ? caseStudyModuleRose : cardInfo
                } ${cardHover}`}
              >
                <h3 className="text-base font-semibold leading-snug text-gray-950 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 lg:gap-6">
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
        </section>

        <section className="text-center">
          <div
            className={`mx-auto max-w-2xl px-6 py-10 sm:px-10 sm:py-12 ${cardHero}`}
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
              {content.status.eyebrow}
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl">
              {content.status.title}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-700">
              {content.status.body}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
