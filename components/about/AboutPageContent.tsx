"use client";

import Link from "next/link";
import { categories } from "@/lib/articles";
import { usePageContent } from "@/lib/i18n/use-page-content";
import { useLanguage } from "@/components/LanguageProvider";
import { getCategoryDescription, getCategoryLabel } from "@/lib/i18n/ui-strings";
import {
  cardHero,
  cardHover,
  cardInfo,
  cardTintIndigo,
  cardTintSky,
} from "@/lib/ui/card-system";

export default function AboutPageContent() {
  const { language } = useLanguage();
  const copy = usePageContent();

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
      <section className={`mb-10 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950 sm:text-4xl">
          {copy.about.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
          {copy.about.intro}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-950">
          {copy.about.positioningTitle}
        </h2>
        <div
          className={`mt-4 space-y-4 p-6 text-base leading-relaxed text-gray-700 sm:p-7 ${cardInfo}`}
        >
          <p>{copy.about.positioningParagraphs[0]}</p>
          <p>{copy.about.positioningParagraphs[1]}</p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-950">
          {copy.about.categoriesTitle}
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className={`block p-4 ${index % 2 === 0 ? cardTintSky : cardTintIndigo} ${cardHover}`}
              >
                <span className="font-semibold text-gray-950">
                  {getCategoryLabel(language, category.slug)}
                </span>
                <p className="mt-1 text-sm text-gray-600">
                  {getCategoryDescription(language, category.slug)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={`mt-12 p-6 sm:p-8 ${cardInfo}`}>
        <p className="text-sm leading-7 text-gray-700">
          {copy.about.portfolioNote}
        </p>
      </section>

      <section className={`mt-12 p-8 ${cardTintSky}`}>
        <h2 className="text-xl font-semibold text-gray-950">
          {copy.about.disclaimerTitle}
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          {copy.about.disclaimer}
        </p>
      </section>
    </div>
  );
}
