"use client";

import type { Article } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { useLanguage } from "@/components/LanguageProvider";
import { usePageContent } from "@/lib/i18n/use-page-content";
import { getCategoryLabel } from "@/lib/i18n/ui-strings";
import { cardHero, cardInfo } from "@/lib/ui/card-system";

export default function CategoryPageContent({
  categorySlug,
  articles: filteredArticles,
}: {
  categorySlug: string;
  articles: Article[];
}) {
  const { language } = useLanguage();
  const copy = usePageContent();
  const categoryLabel = getCategoryLabel(language, categorySlug);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <section className={`mb-8 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
          {categoryLabel || copy.categoryPage.unknownCategory}
        </h1>

        <p className="mt-3 text-gray-600">
          {copy.categoryPage.articleCount(filteredArticles.length)}
        </p>
      </section>

      {filteredArticles.length === 0 ? (
        <div className={`p-6 text-gray-600 ${cardInfo}`}>
          {copy.categoryPage.empty}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
