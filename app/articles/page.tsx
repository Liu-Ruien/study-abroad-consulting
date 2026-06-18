/**
 * 文章列表页
 * 展示全部文章，每篇以 ArticleCard 卡片形式呈现
 */
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "全部文章",
  description: "浏览所有留学、签证与海外生活相关文章。",
};

export default function ArticlesPage() {
  const allArticles = getAllArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">全部文章</h1>
        <p className="mt-3 text-slate-600">
          共 {allArticles.length} 篇文章，涵盖日本留学、新西兰留学、签证指南与海外生活。
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  );
}
