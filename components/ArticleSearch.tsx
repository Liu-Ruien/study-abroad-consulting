"use client";

/**
 * 文章搜索组件
 * 作用：在文章列表页中提供关键词搜索、分类筛选和文章卡片展示
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Article } from "@/lib/articles";
import { categories } from "@/lib/articles";

export default function ArticleSearch({ articles }: { articles: Article[] }) {
  // 搜索关键词
  const [keyword, setKeyword] = useState("");

  // 当前选中的分类，all 表示全部分类
  const [category, setCategory] = useState("all");

  // 根据关键词和分类筛选文章
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
      {/* 搜索区域 */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
            placeholder="搜索文章，例如：日本、签证、生活成本"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />

          <button
            className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600 transition hover:border-sky-300 hover:text-sky-700"
            onClick={() => setKeyword("")}
          >
            清空
          </button>
        </div>

        {/* 分类筛选按钮 */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === "all"
                ? "bg-sky-600 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700"
            }`}
            onClick={() => setCategory("all")}
          >
            全部
          </button>

          {categories.map((cat) => (
            <button
              key={cat.slug}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === cat.slug
                  ? "bg-sky-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-700"
              }`}
              onClick={() => setCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 搜索结果数量 */}
      <p className="text-sm text-slate-500">
        当前共找到 {filteredArticles.length} 篇文章
      </p>

      {/* 文章列表 */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
          没有找到相关文章，请尝试更换关键词或分类。
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => {
            const categoryInfo = categories.find(
              (cat) => cat.slug === article.category
            );

            return (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-sm"
              >
                <div className="mb-3 flex items-center gap-2 text-xs text-slate-500">
                  <span className="rounded-full bg-sky-50 px-2 py-1 text-sky-700">
                    {categoryInfo?.name ?? "未知分类"}
                  </span>
                  <span>约 3 分钟阅读</span>
                </div>

                <h2 className="mb-2 text-lg font-bold text-slate-900">
                  {article.title}
                </h2>

                <p className="text-sm leading-6 text-slate-600">
                  {article.excerpt}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}