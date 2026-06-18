/**
 * 首页
 * 展示网站定位、四大内容模块、最新文章与发展规划
 */
import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { categories, getAllArticles } from "@/lib/articles";

/** 各分类在首页卡片上显示的图标 */
const categoryIcons: Record<string, string> = {
  "japan-study": "🇯🇵",
  "new-zealand-study": "🇳🇿",
  "visa-guide": "📋",
  "overseas-life": "🏠",
};

export default function HomePage() {
  // 首页只展示前 4 篇作为「最新文章」
  const latestArticles = getAllArticles().slice(0, 4);

  return (
    <>
      {/* Hero 区域：网站介绍与主要入口按钮 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),_transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <p className="mb-4 inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-800">
              个人开发项目 · MVP 第一版
            </p>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              出国咨询
              <span className="block text-sky-600">实用信息，清晰整理</span>
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">
              专注日本留学、新西兰留学、签证指南与海外生活，帮你从零开始了解出国所需的关键信息。
              目前全部内容免费开放，后期将逐步加入 AI 问答、付费咨询与预约功能。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
              >
                浏览全部文章
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                了解本站
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 四大内容模块入口 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">四大内容模块</h2>
          <p className="mt-3 text-slate-600">按主题分类，快速找到你需要的出国信息</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
            >
              <span className="mb-3 block text-3xl">{categoryIcons[category.slug]}</span>
              <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-sky-700">
                {category.name}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新文章预览 */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">最新文章</h2>
              <p className="mt-2 text-slate-600">精选实用内容，持续更新中</p>
            </div>
            <Link
              href="/articles"
              className="text-sm font-medium text-sky-600 hover:text-sky-800"
            >
              查看全部 →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* 当前阶段与未来规划 */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">发展规划</h2>
          <p className="mt-3 text-slate-600">从免费内容起步，逐步构建完整咨询体验</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-8">
            <span className="mb-3 inline-flex rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white">
              当前阶段
            </span>
            <h3 className="mb-3 text-xl font-bold text-slate-900">免费内容网站</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-700">
              <li>· 留学与签证实用文章</li>
              <li>· 按分类浏览文章</li>
              <li>· 无需注册，随时阅读</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <span className="mb-3 inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
              未来规划
            </span>
            <h3 className="mb-3 text-xl font-bold text-slate-900">付费咨询与智能服务</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-600">
              <li>· AI 智能问答助手</li>
              <li>· 一对一付费咨询</li>
              <li>· 在线预约与进度跟踪</li>
              <li>· 用户登录与个性化推荐</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
