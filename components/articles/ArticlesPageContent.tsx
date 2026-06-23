"use client";

import type { Article } from "@/lib/articles";
import ArticleSearch from "@/components/ArticleSearch";
import { usePageContent } from "@/lib/i18n/use-page-content";
import { cardHero } from "@/lib/ui/card-system";

export default function ArticlesPageContent({
  articles,
}: {
  articles: Article[];
}) {
  const copy = usePageContent();

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <section className={`mb-8 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl">
          {copy.articles.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
          {copy.articles.description}
        </p>
      </section>

      <ArticleSearch articles={articles} />
    </div>
  );
}
