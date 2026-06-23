"use client";

import Link from "next/link";
import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  badgeSoft,
  btnPrimary,
  btnSecondary,
  caseStudyHeroContent,
  caseStudyHeroGlow,
  pageBackground,
  tagApple,
} from "@/lib/ui/card-system";

export default function CaseStudyHero({
  content,
}: {
  content: CaseStudyContent["hero"];
}) {
  return (
    <section
      className={`relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-20 sm:px-6 lg:min-h-[92vh] lg:pb-32 lg:pt-24 ${pageBackground}`}
    >
      <div className={caseStudyHeroGlow} aria-hidden />

      <div className={caseStudyHeroContent}>
        <p className={`mb-6 inline-flex sm:px-4 sm:py-1.5 ${badgeSoft}`}>
          {content.badge}
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          {content.tags.map((tag) => (
            <span key={tag} className={tagApple}>
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-gray-950 sm:text-6xl md:text-7xl lg:text-[4.5rem]">
          {content.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-8 sm:text-lg lg:text-xl">
          {content.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
          <Link
            href="/plan"
            className={`inline-flex rounded-full px-7 py-3.5 text-sm font-medium ${btnPrimary}`}
          >
            {content.ctaPlan}
          </Link>
          <Link
            href="/ai"
            className={`inline-flex rounded-full px-7 py-3.5 text-sm font-medium ${btnSecondary}`}
          >
            {content.ctaAi}
          </Link>
        </div>
      </div>
    </section>
  );
}
