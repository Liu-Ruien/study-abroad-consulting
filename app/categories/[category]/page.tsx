/**
 * 分类文章页
 * 路由：/categories/[category]
 * 按分类 slug 筛选并展示对应文章
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/ArticleCard";
import {
  categories,
  getArticlesByCategory,
  getCategoryBySlug,
  isValidCategorySlug,
  type CategorySlug,
} from "@/lib/articles";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/** 构建时预生成四个分类页的静态路径 */
export async function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;

  if (!isValidCategorySlug(categorySlug)) {
    return { title: "分类未找到" };
  }

  const category = getCategoryBySlug(categorySlug)!;

  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;

  if (!isValidCategorySlug(categorySlug)) {
    notFound();
  }

  const category = getCategoryBySlug(categorySlug)!;
  const categoryArticles = getArticlesByCategory(categorySlug as CategorySlug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{category.description}</p>
        <p className="mt-2 text-sm text-slate-400">共 {categoryArticles.length} 篇文章</p>
      </div>

      {categoryArticles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <p className="text-slate-600">该分类下暂无文章，敬请期待。</p>
        </div>
      )}
    </div>
  );
}
