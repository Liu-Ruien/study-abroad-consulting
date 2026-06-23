"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import Link from "next/link";
import type { CaseStudyContent } from "@/lib/case-study-i18n";
import ArchitectureShowcase from "@/components/case-study/ArchitectureShowcase";
import CaseStudyHighlightsCarousel from "@/components/case-study/CaseStudyHighlightsCarousel";
import {
  caseStudyGlassCard,
  caseStudyHeroGlow,
  caseStudySectionDarkLabel,
  tagApple,
} from "@/lib/ui/card-system";

const DESKTOP_MIN_WIDTH = 768;
const PANEL_LOCK_MS = 820;

const glassCard =
  `${caseStudyGlassCard} p-5 sm:p-6`;

const panelShell =
  "relative h-auto w-full shrink-0 overflow-hidden px-4 py-16 md:h-full md:w-full md:px-6 md:py-0";

const panelInner =
  "relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center md:pb-28";

const panelBackgrounds = [
  "bg-[#05070d] [background-image:radial-gradient(circle_at_12%_8%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(129,140,248,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(15,23,42,0.9),transparent_46%)]",
  "bg-[#05070d] [background-image:radial-gradient(circle_at_10%_55%,rgba(56,189,248,0.13),transparent_34%),radial-gradient(circle_at_90%_18%,rgba(34,211,238,0.09),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(2,6,23,0.9),transparent_48%)]",
  "bg-[#070a12] [background-image:radial-gradient(circle_at_18%_20%,rgba(14,165,233,0.13),transparent_35%),radial-gradient(circle_at_88%_80%,rgba(129,140,248,0.10),transparent_42%)]",
  "bg-[#080b13] [background-image:radial-gradient(circle_at_18%_12%,rgba(56,189,248,0.10),transparent_34%),radial-gradient(circle_at_78%_66%,rgba(15,23,42,0.95),transparent_44%)]",
  "bg-[#05070d] [background-image:radial-gradient(circle_at_8%_70%,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(129,140,248,0.10),transparent_40%)]",
  "bg-[#070711] [background-image:radial-gradient(circle_at_18%_16%,rgba(129,140,248,0.13),transparent_36%),radial-gradient(circle_at_82%_78%,rgba(56,189,248,0.08),transparent_42%)]",
  "bg-[#070a12] [background-image:radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.11),transparent_36%),radial-gradient(circle_at_84%_82%,rgba(129,140,248,0.10),transparent_40%)]",
  "bg-[#05070d] [background-image:radial-gradient(circle_at_20%_70%,rgba(34,211,238,0.10),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(129,140,248,0.09),transparent_42%)]",
  "bg-[#05070d] [background-image:radial-gradient(circle_at_12%_18%,rgba(56,189,248,0.14),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(34,211,238,0.08),transparent_40%),linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:auto,auto,72px_72px,72px_72px]",
  "bg-[#070a12] [background-image:radial-gradient(circle_at_18%_20%,rgba(244,63,94,0.07),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(129,140,248,0.11),transparent_40%)]",
  "bg-[#080b13] [background-image:radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.10),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(129,140,248,0.10),transparent_42%)]",
];

const panelIds = [
  "hero",
  "highlights",
  "interviewer",
  "background",
  "features",
  "technical",
  "role",
  "stack",
  "architecture",
  "boundary",
  "status",
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const sync = () => setIsDesktop(window.innerWidth >= DESKTOP_MIN_WIDTH);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return isDesktop;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className={caseStudySectionDarkLabel}>{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function Panel({
  children,
  active,
  index,
}: {
  children: ReactNode;
  active: boolean;
  index: number;
}) {
  return (
    <section
      className={`${panelShell} ${panelBackgrounds[index]}`}
      aria-hidden={!active}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.035),transparent_58%)]" />
      <div
        className={`${panelInner} transition duration-[760ms] ease-out ${
          active
            ? "md:translate-y-0 md:scale-100 md:opacity-100"
            : "md:-translate-y-4 md:scale-[0.97] md:opacity-0"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

export default function CaseStudyPresentation({
  content,
}: {
  content: CaseStudyContent;
}) {
  const [activePanel, setActivePanel] = useState(0);
  const lockRef = useRef(false);
  const rootRef = useRef<HTMLElement>(null);
  const activePanelRef = useRef(0);
  const isDesktopRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  const panelCount = panelIds.length;
  const lastPanel = panelCount - 1;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    activePanelRef.current = activePanel;
  }, [activePanel]);

  useEffect(() => {
    isDesktopRef.current = isDesktop;
  }, [isDesktop]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  function goTo(index: number) {
    setActivePanel(Math.max(0, Math.min(index, lastPanel)));
  }

  const handleWheelDelta = useCallback((deltaY: number, preventDefault: () => void) => {
    if (!isDesktopRef.current || reducedMotionRef.current) return;

    const direction = deltaY > 0 ? 1 : deltaY < 0 ? -1 : 0;
    if (direction === 0) return;

    const currentPanel = activePanelRef.current;

    if (direction === -1 && currentPanel === 0) {
      preventDefault();
      return;
    }

    if (direction === 1 && currentPanel === lastPanel) {
      preventDefault();
      return;
    }

    preventDefault();
    if (lockRef.current) return;

    lockRef.current = true;
    setActivePanel(Math.max(0, Math.min(currentPanel + direction, lastPanel)));
    window.setTimeout(() => {
      lockRef.current = false;
    }, PANEL_LOCK_MS);
  }, [lastPanel]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    function handleNativeWheel(event: globalThis.WheelEvent) {
      handleWheelDelta(event.deltaY, () => event.preventDefault());
    }

    root.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => root.removeEventListener("wheel", handleNativeWheel);
  }, [handleWheelDelta]);

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!isDesktop || reducedMotion) return;

    if (event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goTo(activePanel + 1);
    }

    if (event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goTo(activePanel - 1);
    }
  }

  return (
    <section
      ref={rootRef}
      className="relative bg-[#05070d] text-white md:h-[calc(100svh-var(--case-study-nav-height))] md:overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={content.hero.title}
    >
      <div
        className="flex flex-col md:h-full md:flex-row"
        style={{
          transform: isDesktop ? `translateX(-${activePanel * 100}%)` : undefined,
          transition: reducedMotion
            ? "none"
            : "transform 760ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Panel active={activePanel === 0} index={0}>
          <div className={`relative w-full max-w-5xl overflow-hidden px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-14 ${caseStudyGlassCard} rounded-[44px]`}>
            <div className={caseStudyHeroGlow} aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-sky-400/[0.04]" />
            <div className="relative">
              <p className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-slate-300 shadow-[0_10px_40px_rgba(0,0,0,0.20)] backdrop-blur-xl">
                {content.hero.badge}
              </p>
              <div className="mb-7 flex flex-wrap items-center justify-center gap-2.5">
                {content.hero.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`${tagApple} border-white/10 bg-white/[0.06] text-slate-300`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="mx-auto max-w-5xl text-[2.5rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-[4.8rem]">
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {content.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/plan"
                  className="inline-flex rounded-full border border-white/20 bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_10px_40px_rgba(255,255,255,0.10)] transition duration-200 hover:bg-slate-100"
                >
                  {content.hero.ctaPlan}
                </Link>
                <Link
                  href="/ai"
                  className="inline-flex rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition duration-200 hover:bg-white/15"
                >
                  {content.hero.ctaAi}
                </Link>
              </div>
            </div>
          </div>
        </Panel>

        <Panel active={activePanel === 1} index={1}>
          <CaseStudyHighlightsCarousel content={content.highlights} embedded />
        </Panel>

        <Panel active={activePanel === 2} index={2}>
          <SectionIntro
            eyebrow={content.interviewerFocus.eyebrow}
            title={content.interviewerFocus.title}
          />
          <div className="mt-9 grid w-full gap-4 sm:grid-cols-2 lg:gap-5">
            {content.interviewerFocus.cards.map((card) => (
              <article key={card.title} className={glassCard}>
                <h3 className="text-lg font-semibold tracking-tight text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel active={activePanel === 3} index={3}>
          <SectionIntro
            eyebrow={content.background.eyebrow}
            title={content.background.title}
          />
          <article className={`${glassCard} mt-9 max-w-4xl`}>
            <h3 className="text-xl font-semibold tracking-tight text-white">
              {content.background.cardTitle}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300 sm:text-base">
              <p>{content.background.paragraphs[0]}</p>
              <p>{content.background.paragraphs[1]}</p>
            </div>
          </article>
        </Panel>

        <Panel active={activePanel === 4} index={4}>
          <SectionIntro
            eyebrow={content.features.eyebrow}
            title={content.features.title}
            description={content.features.description}
          />
          <div className="mt-9 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {content.features.cards.map((card) => (
              <article key={card.title} className={glassCard}>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel active={activePanel === 5} index={5}>
          <SectionIntro
            eyebrow={content.technicalDecisions.eyebrow}
            title={content.technicalDecisions.title}
            description={content.technicalDecisions.description}
          />
          <div className="mt-9 grid w-full gap-4 md:grid-cols-2 lg:gap-5">
            {content.technicalDecisions.items.slice(0, 4).map((item) => (
              <article key={item.title} className={glassCard}>
                <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel active={activePanel === 6} index={6}>
          <SectionIntro eyebrow={content.myRole.eyebrow} title={content.myRole.title} />
          <div className={`${glassCard} mt-9 w-full max-w-4xl`}>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-x-8">
              {content.myRole.items.slice(0, 6).map((item) => (
                <li key={item} className="flex gap-2.5 text-sm text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300/80" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        <Panel active={activePanel === 7} index={7}>
          <SectionIntro
            eyebrow={content.stack.eyebrow}
            title={content.stack.title}
            description={content.engineering.description}
          />
          <div className="mt-9 grid w-full gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className={glassCard}>
              <div className="flex flex-wrap justify-center gap-2.5">
                {content.stack.items.map((item) => (
                  <span
                    key={item}
                    className={`${tagApple} border-white/10 bg-white/[0.06] text-slate-300`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.engineering.items.slice(0, 4).map((item) => (
                <article key={item.title} className={glassCard}>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Panel>

        <Panel active={activePanel === 8} index={8}>
          <ArchitectureShowcase content={content.architectureShowcase} compact />
        </Panel>

        <Panel active={activePanel === 9} index={9}>
          <SectionIntro eyebrow="Scope" title={content.boundaries.title} />
          <div className="mt-9 grid w-full gap-5 lg:grid-cols-2">
            <article className={glassCard}>
              <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
                {content.boundaries.items.slice(0, 5).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-300/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className={glassCard}>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                {content.future.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
                {content.future.items.slice(0, 5).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-300/80" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Panel>

        <Panel active={activePanel === 10} index={10}>
          <div className={`${glassCard} max-w-3xl px-8 py-12 text-center sm:px-12 sm:py-14`}>
            <p className={caseStudySectionDarkLabel}>{content.status.eyebrow}</p>
            <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              {content.status.title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              {content.status.body}
            </p>
          </div>
        </Panel>
      </div>

      <div className="pointer-events-auto absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-1/2 z-30 hidden -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-white/10 bg-slate-950/45 px-4 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:flex">
        {panelIds.map((panel, index) => (
          <button
            key={panel}
            type="button"
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activePanel === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Case study panel ${index + 1}`}
            aria-current={activePanel === index}
          />
        ))}
        <span className="ml-2 text-xs font-medium text-slate-500">
          {activePanel + 1}/{panelCount}
        </span>
      </div>
    </section>
  );
}
