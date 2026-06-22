// 首页
// 作用：展示网站定位、主要内容分类、当前阶段功能和项目案例入口

import Link from "next/link";
import { articles, categories } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
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

export default function Home() {
  const featuredArticles = articles.slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <section
        className={`relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16 ${cardHero}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(186,230,253,0.28),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(221,214,254,0.18),transparent_38%)]" />

        <div className="relative">
          <p className={`mb-4 inline-flex sm:px-4 sm:py-1.5 ${badgeSoft}`}>
            个人开发项目 · 作品集展示
          </p>

          <h1 className="mb-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-5xl">
            出国咨询信息整理平台
          </h1>

          <p className="mb-8 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
            围绕内容文章、路线规划、本地 AI 问答 MVP 和项目案例展示，呈现信息整理、产品拆解、前端工程与
            AI 应用理解能力。
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/case-study"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnPrimary}`}
            >
              查看项目案例
            </Link>

            <Link
              href="/articles"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnSecondary}`}
            >
              浏览全部文章
            </Link>

            <Link
              href="/about"
              className={`rounded-full px-5 py-3 text-sm font-medium ${btnSecondary}`}
            >
              了解本站
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-950">
          内容分类
        </h2>
        <p className="mb-6 text-gray-600">按主题快速找到你需要的出国信息。</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className={`p-6 ${index % 2 === 0 ? cardTintSky : cardTintIndigo} ${cardHover}`}
            >
              <h3 className="mb-2 text-lg font-semibold text-gray-950">
                {category.name}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                查看 {category.name} 相关的基础信息和实用指南。
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-semibold tracking-tight text-gray-950">
              推荐阅读
            </h2>
            <p className="text-gray-600">先从这些基础文章开始了解出国准备。</p>
          </div>

          <Link href="/articles" className={linkAccent}>
            查看全部 →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
