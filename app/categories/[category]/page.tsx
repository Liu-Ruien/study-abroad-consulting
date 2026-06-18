// 分类文章页面
// 作用：根据 URL 中的 category 参数，展示对应分类下的文章列表

import { articles, categories } from "@/lib/articles";
import Link from "next/link";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Next.js 16 中 params 是异步对象，需要 await
  const { category } = await params;

  // 找到当前分类信息
  const currentCategory = categories.find((item) => item.slug === category);

  // 根据分类 slug 筛选文章
  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* 页面标题 */}
      <h1 className="mb-2 text-3xl font-bold text-slate-900">
        {currentCategory ? currentCategory.name : "未知分类"}
      </h1>

      <p className="mb-8 text-slate-600">
        当前分类下共有 {filteredArticles.length} 篇文章
      </p>

      {/* 如果没有文章，显示提示 */}
      {filteredArticles.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-600">
          当前分类下暂无文章。
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-sm"
            >
              <h2 className="mb-2 text-lg font-bold text-slate-900">
                {article.title}
              </h2>
              <p className="text-sm leading-6 text-slate-600">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}