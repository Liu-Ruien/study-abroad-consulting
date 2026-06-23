"use client";

import AiChatPanel from "@/components/ai/AiChatPanel";
import { usePageContent } from "@/lib/i18n/use-page-content";
import {
  badgeSoft,
  cardFloating,
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintRose,
  cardTintSky,
  pageBackground,
} from "@/lib/ui/card-system";

const focusToneClasses = [cardTintSky, cardTintIndigo, cardTintRose];

type AiPageContentProps = {
  initialQuestion: string;
};

export default function AiPageContent({ initialQuestion }: AiPageContentProps) {
  const copy = usePageContent();

  return (
    <main
      className={`min-h-screen overflow-x-hidden px-4 py-5 pb-10 text-gray-950 sm:px-6 sm:py-8 sm:pb-14 lg:py-10 lg:pb-16 ${pageBackground}`}
    >
      <div className="mx-auto max-w-6xl min-w-0">
        <section
          className={`relative mb-5 overflow-hidden px-4 py-8 text-center sm:mb-6 sm:px-6 sm:py-11 lg:mb-7 lg:px-8 lg:py-14 ${cardHero}`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(186,230,253,0.35),transparent_38%),radial-gradient(circle_at_82%_14%,rgba(221,214,254,0.22),transparent_36%)]" />

          <div className="relative mx-auto max-w-4xl min-w-0">
            <p className={`mb-4 inline-flex sm:mb-5 sm:px-4 sm:py-1.5 ${badgeSoft}`}>
              {copy.ai.badge}
            </p>

            <h1 className="mx-auto max-w-4xl text-[1.875rem] font-semibold leading-[1.08] tracking-[-0.05em] text-gray-950 sm:text-5xl sm:leading-[0.98] md:text-6xl lg:text-7xl">
              {copy.ai.title}
              <br />
              {copy.ai.titleLine2}
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-600 sm:mt-5 sm:text-base lg:text-lg">
              {copy.ai.description}
            </p>

            <div
              className={`mx-auto mt-6 hidden max-w-xl p-4 text-left sm:mt-8 sm:block sm:p-5 lg:mt-9 ${cardFloating}`}
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sky-600">
                {copy.ai.previewKicker}
              </p>
              <h2 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-2xl">
                {copy.ai.previewTitle}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {copy.ai.previewBody}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 grid gap-3 sm:mb-6 sm:gap-4 md:grid-cols-3 md:gap-5 lg:mb-7">
          {copy.ai.focusCards.map((card, index) => (
            <div
              key={card.title}
              className={`min-w-0 px-5 py-5 sm:px-6 sm:py-6 md:min-h-[148px] md:py-7 ${focusToneClasses[index]} ${cardHover}`}
            >
              <h2 className="text-2xl font-semibold leading-snug tracking-tight text-gray-950 sm:text-3xl md:text-4xl">
                {card.title}
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600 sm:mt-4">
                {card.description}
              </p>
            </div>
          ))}
        </section>

        <AiChatPanel initialQuestion={initialQuestion} />

        <section
          className={`mx-auto mt-6 max-w-4xl px-4 py-3.5 text-sm leading-relaxed text-gray-500 sm:mt-8 sm:px-6 sm:py-4 ${cardInfo}`}
        >
          <strong className="text-gray-950">{copy.ai.disclaimerLabel}</strong>
          {copy.ai.disclaimer}
        </section>
      </div>
    </main>
  );
}
