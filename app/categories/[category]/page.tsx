// 分类文章页面
// 作用：根据 URL 中的 category 参数，展示对应分类下的文章列表

import { articles, categories } from "@/lib/articles";
import Link from "next/link";
import { cardHero, cardHover, cardInfo } from "@/lib/ui/card-system";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const currentCategory = categories.find((item) => item.slug === category);

  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <section className={`mb-8 px-6 py-8 sm:px-8 ${cardHero}`}>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-950">
          {currentCategory ? currentCategory.name : "未知分类"}
        </h1>

        <p className="mt-3 text-gray-600">
          当前分类下共有 {filteredArticles.length} 篇文章
        </p>
      </section>

      {filteredArticles.length === 0 ? (
        <div className={`p-6 text-gray-600 ${cardInfo}`}>
          当前分类下暂无文章。
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={`p-5 sm:p-6 ${cardInfo} ${cardHover}`}
            >
              <h2 className="mb-2 text-lg font-semibold text-gray-950">
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
