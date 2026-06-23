"use client";

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getLocalizedArticle } from "@/lib/article-localization";
import { useLanguage } from "@/components/LanguageProvider";
import { usePageContent } from "@/lib/i18n/use-page-content";
import {
  cardInfo,
  cardTintSky,
  getArticleTagTone,
  linkAccent,
} from "@/lib/ui/card-system";

export default function ArticleDetailContent({ article }: { article: Article }) {
  const { language } = useLanguage();
  const copy = usePageContent();
  const localized = getLocalizedArticle(article, language);

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link href="/articles" className={linkAccent}>
        {copy.articleDetail.backLink}
      </Link>

      <article className={`mt-6 px-6 py-8 sm:px-8 sm:py-10 ${cardTintSky}`}>
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <span className={getArticleTagTone(article.category)}>
            {localized.categoryLabel}
          </span>
        </div>

        <h1 className="mb-4 text-3xl font-semibold leading-snug tracking-tight text-gray-950">
          {localized.title}
        </h1>

        <div className="mb-8 flex flex-wrap gap-3 text-sm text-gray-500">
          <span>
            {copy.articleDetail.categoryLabel}：{localized.categoryLabel}
          </span>
          <span>
            {copy.articleDetail.readTimeLabel}：{localized.readTime}
          </span>
        </div>

        <p className={`mb-8 p-4 leading-relaxed text-gray-700 ${cardInfo}`}>
          {localized.excerpt}
        </p>

        <div className="space-y-5 leading-8 text-gray-800">
          {localized.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
