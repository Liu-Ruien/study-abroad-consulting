// 文章详情页
// 作用：根据 URL 中的 slug 找到对应文章，并展示文章详情

import { articles, categories } from "@/lib/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cardAnswer, cardInfo, linkAccent } from "@/lib/ui/card-system";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const category = categories.find((item) => item.slug === article.category);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/articles"
        className={linkAccent}
      >
        ← 返回全部文章
      </Link>

      <article className={`px-6 py-8 sm:px-8 sm:py-10 ${cardAnswer}`}>
        <h1 className="mb-4 text-3xl font-semibold leading-snug tracking-tight text-gray-950">
          {article.title}
        </h1>

        <div className="mb-8 flex flex-wrap gap-3 text-sm text-gray-500">
          <span>分类：{category?.name ?? "未知分类"}</span>
          <span>阅读时间：约 3 分钟</span>
        </div>

        <p className={`mb-8 p-4 leading-relaxed text-gray-700 ${cardInfo}`}>
          {article.excerpt}
        </p>

        <div className="leading-8 text-gray-800">{article.content}</div>
      </article>
    </main>
  );
}
