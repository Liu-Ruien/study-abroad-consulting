"use client";

/**
 * 文章搜索组件
 * 作用：在文章列表页中提供关键词搜索、分类筛选和文章卡片展示
 */

import { useMemo, useState } from "react";
import type { Article } from "@/lib/articles";
import { categories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import {
  btnPrimary,
  cardInfo,
  cardInput,
  chipSecondary,
  inputField,
} from "@/lib/ui/card-system";

export default function ArticleSearch({ articles }: { articles: Article[] }) {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchCategory =
        category === "all" || article.category === category;

      const lowerKeyword = keyword.toLowerCase();

      const matchKeyword =
        article.title.toLowerCase().includes(lowerKeyword) ||
        article.excerpt.toLowerCase().includes(lowerKeyword) ||
        article.content.toLowerCase().includes(lowerKeyword);

      return matchCategory && matchKeyword;
    });
  }, [articles, keyword, category]);

  return (
    <section className="space-y-6">
      <div className={`p-4 sm:p-5 ${cardInput}`}>
        <div className="flex gap-3">
          <input
            className={`w-full rounded-xl px-4 py-3 text-sm ${inputField}`}
            placeholder="搜索文章，例如：日本、签证、生活成本"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />

          <button
            className={`shrink-0 rounded-xl px-4 py-3 text-sm font-medium ${chipSecondary}`}
            onClick={() => setKeyword("")}
          >
            清空
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === "all" ? btnPrimary : chipSecondary
            }`}
            onClick={() => setCategory("all")}
          >
            全部
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat.slug ? btnPrimary : chipSecondary
              }`}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500">
        当前共找到 {filteredArticles.length} 篇文章
      </p>

      {filteredArticles.length === 0 ? (
        <div
          className={`border border-dashed border-slate-200/80 p-8 text-center text-gray-500 ${cardInfo}`}
        >
          没有找到相关文章，请尝试更换关键词或分类。
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
