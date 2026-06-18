// 首页
// 作用：展示网站定位、主要内容分类、当前阶段功能和后续规划

import Link from "next/link";
import { articles, categories } from "@/lib/articles";

export default function Home() {
  // 首页只展示前 4 篇文章，避免页面太长
  const featuredArticles = articles.slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {/* Hero 区域：网站第一屏介绍 */}
      <section className="rounded-3xl bg-gradient-to-br from-sky-50 to-white px-8 py-14">
        <p className="mb-4 inline-block rounded-full bg-sky-100 px-4 py-1 text-sm font-medium text-sky-700">
          个人开发项目 · MVP 版本
        </p>

        <h1 className="mb-6 max-w-3xl text-4xl font-bold leading-tight text-slate-900">
          出国咨询信息整理平台
        </h1>

        <p className="mb-8 max-w-3xl leading-8 text-slate-600">
          专注日本留学、新西兰留学、签证指南和海外生活信息整理。
          当前版本以免费内容为主，后续计划加入 AI 问答、付费咨询和预约功能。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/articles"
            className="rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-sky-700"
          >
            浏览全部文章
          </Link>

          <Link
            href="/about"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-sky-300"
          >
            了解本站
          </Link>
        </div>
      </section>

      {/* 分类入口 */}
      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-bold text-slate-900">内容分类</h2>
        <p className="mb-6 text-slate-600">
          按主题快速找到你需要的出国信息。
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-sm"
            >
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {category.name}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                查看 {category.name} 相关的基础信息和实用指南。
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 推荐文章 */}
      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-slate-900">
              推荐阅读
            </h2>
            <p className="text-slate-600">
              先从这些基础文章开始了解出国准备。
            </p>
          </div>

          <Link
            href="/articles"
            className="text-sm font-medium text-sky-600 hover:text-sky-700"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-sm"
            >
              <h3 className="mb-2 text-lg font-bold text-slate-900">
                {article.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}