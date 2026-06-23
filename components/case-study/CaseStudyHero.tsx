"use client";

import Link from "next/link";
import type { CaseStudyContent } from "@/lib/case-study-i18n";
import {
  caseStudyHeroContent,
  caseStudyHeroGlow,
  tagApple,
} from "@/lib/ui/card-system";

export default function CaseStudyHero({
  content,
}: {
  content: CaseStudyContent["hero"];
}) {
  return (
    <section
      className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden bg-[#05070d] px-4 py-24 text-white sm:min-h-[calc(100svh-var(--case-study-nav-height))] sm:px-6"
    >
      <div className={caseStudyHeroGlow} aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]"
        aria-hidden
      />

      <div className={`${caseStudyHeroContent} relative overflow-hidden rounded-[44px] border border-white/10 bg-slate-900/60 px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-10 sm:py-12 lg:px-14`}>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-sky-400/[0.04]"
          aria-hidden
        />
        <div className="relative">
        <p className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.20)] backdrop-blur-xl">
          {content.badge}
        </p>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          {content.tags.map((tag) => (
            <span
              key={tag}
              className={`${tagApple} border-white/10 bg-white/[0.06] text-slate-300`}
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
          {content.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:mt-8 sm:text-lg lg:text-xl">
          {content.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
          <Link
            href="/plan"
            className="inline-flex rounded-full border border-white/20 bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,0.10)] transition duration-200 hover:bg-slate-100"
          >
            {content.ctaPlan}
          </Link>
          <Link
            href="/ai"
            className="inline-flex rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition duration-200 hover:bg-white/15"
          >
            {content.ctaAi}
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
