/**
 * 文章详情页
 * 路由：/articles/[slug]
 * 根据 slug 读取本地文章数据并渲染正文
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  getArticleBySlug,
  getCategoryName,
} from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

/** 构建时预生成所有文章详情页的静态路径 */
export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "文章未找到" };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link
        href="/articles"
        className="mb-8 inline-flex items-center text-sm font-medium text-sky-600 transition-colors hover:text-sky-800"
      >
        ← 返回文章列表
      </Link>

      <header className="mb-10 border-b border-slate-200 pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/categories/${article.category}`}
            className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100"
          >
            {getCategoryName(article.category)}
          </Link>
          <span className="text-sm text-slate-400">{article.readingTime} 分钟阅读</span>
          <span className="text-sm text-slate-400">{article.publishedAt}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{article.excerpt}</p>
      </header>

      <div className="space-y-5">
        {article.content.map((paragraph, index) => (
          <p key={index} className="text-base leading-8 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <footer className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">
          以上内容仅供参考，具体政策与要求请以官方及院校最新信息为准。
        </p>
        <Link
          href="/articles"
          className="mt-4 inline-flex items-center text-sm font-medium text-sky-600 hover:text-sky-800"
        >
          ← 返回文章列表
        </Link>
      </footer>
    </article>
  );
}
