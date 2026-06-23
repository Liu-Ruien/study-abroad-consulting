"use client";

import Link from "next/link";
import { articles, categories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { usePageContent } from "@/lib/i18n/use-page-content";
import { useLanguage } from "@/components/LanguageProvider";
import { getCategoryLabel } from "@/lib/i18n/ui-strings";
import {
  badgeSoft,
  btnPrimary,
  btnSecondary,
  cardHero,
  cardHover,
  cardTintIndigo,
  cardTintSky,
  linkAccent,
} from "@/lib/ui/card-system";

export default function HomePageContent() {
  const { language } = useLanguage();
  const copy = usePageContent();
  const featuredArticles = articles.slice(0, 4);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <section
        className={`relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16 ${cardHero}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(186,230,253,0.28),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(221,214,254,0.18),transparent_38%)]" />

        <div className="relative">
          <p className={`mb-4 inline-flex sm:px-4 sm:py-1.5 ${badgeSoft}`}>
            {copy.home.badge}
          </p>

          <h1 className="mb-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            {copy.home.title}
          </h1>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            {copy.home.subtitle}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/case-study"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnPrimary}`}
            >
              {copy.home.ctaCaseStudy}
            </Link>

            <Link
              href="/articles"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnSecondary}`}
            >
              {copy.home.ctaArticles}
            </Link>

            <Link
              href="/about"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnSecondary}`}
            >
              {copy.home.ctaAbout}
            </Link>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-500">
            {copy.home.languageHint}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-950">
          {copy.home.categoriesTitle}
        </h2>
        <p className="mb-6 text-gray-600">{copy.home.categoriesDescription}</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const label = getCategoryLabel(language, category.slug);
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                className={`p-6 ${index % 2 === 0 ? cardTintSky : cardTintIndigo} ${cardHover}`}
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-950">
                  {label}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {copy.home.categoryCardDescription(label)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-12 pb-4">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-950">
              {copy.home.featuredTitle}
            </h2>
            <p className="text-gray-600">{copy.home.featuredDescription}</p>
          </div>

          <Link href="/articles" className={linkAccent}>
            {copy.home.featuredViewAll}
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
