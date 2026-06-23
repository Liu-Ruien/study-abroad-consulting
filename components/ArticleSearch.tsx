"use client";

import { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";
import { categories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { useLanguage } from "@/components/LanguageProvider";
import { usePageContent } from "@/lib/i18n/use-page-content";
import { getArticleSearchText } from "@/lib/article-localization";
import { getCategoryLabel } from "@/lib/i18n/ui-strings";
import {
  btnPrimary,
  cardInfo,
  cardInput,
  chipSecondary,
  inputField,
} from "@/lib/ui/card-system";

export default function ArticleSearch({ articles }: { articles: Article[] }) {
  const { language } = useLanguage();
  const copy = usePageContent();
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory =
        category === "all" || article.category === category;

      const lowerKeyword = keyword.toLowerCase().trim();
      const matchKeyword =
        lowerKeyword === "" ||
        getArticleSearchText(article, language).includes(lowerKeyword);

      return matchCategory && matchKeyword;
    });
  }, [articles, keyword, category, language]);

  return (
    <section className="space-y-6">
      <div className={`p-4 sm:p-5 ${cardInput}`}>
        <div className="flex gap-3">
          <input
            className={`w-full rounded-xl px-4 py-3 text-sm ${inputField}`}
            placeholder={copy.articles.searchPlaceholder}
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />

          <button
            className={`shrink-0 rounded-xl px-4 py-3 text-sm font-medium ${chipSecondary}`}
            onClick={() => setKeyword("")}
          >
            {copy.articles.clear}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === "all" ? btnPrimary : chipSecondary
            }`}
            onClick={() => setCategory("all")}
          >
            {copy.articles.all}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat.slug ? btnPrimary : chipSecondary
              }`}
              onClick={() => setCategory(cat.slug)}
            >
              {getCategoryLabel(language, cat.slug)}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        {copy.articles.resultCount(filteredArticles.length)}
      </p>

      {filteredArticles.length === 0 ? (
        <div
          className={`border border-dashed border-slate-200/80 p-8 text-center text-gray-500 ${cardInfo}`}
        >
          {copy.articles.empty}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
