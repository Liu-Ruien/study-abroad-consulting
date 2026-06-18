// 文章详情页
// 作用：根据 URL 中的 slug 找到对应文章，并展示文章详情

import { articles, categories } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  // Next.js 16 中 params 是异步对象，需要 await
  const { slug } = await params;

  // 根据 URL 中的 slug 查找文章
  const article = articles.find((item) => item.slug === slug);

  // 如果找不到文章，显示 404
  if (!article) {
    notFound();
  }

  // 根据文章分类 slug 找到分类名称
  const category = categories.find((item) => item.slug === article.category);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      {/* 返回文章列表 */}
      <Link
        href="/articles"
        className="mb-6 inline-block text-sm text-sky-600 hover:text-sky-700"
      >
        ← 返回全部文章
      </Link>

      {/* 文章标题 */}
      <h1 className="mb-4 text-3xl font-bold text-slate-900">
        {article.title}
      </h1>

      {/* 文章基础信息 */}
      <div className="mb-8 flex flex-wrap gap-3 text-sm text-slate-500">
        <span>分类：{category?.name ?? "未知分类"}</span>
        <span>阅读时间：约 3 分钟</span>
      </div>

      {/* 文章简介 */}
      <p className="mb-8 rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">
        {article.excerpt}
      </p>

      {/* 文章正文 */}
      <article className="leading-8 text-slate-800">
        {article.content}
      </article>
    </main>
  );
}