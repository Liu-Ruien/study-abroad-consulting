import { articles, categories } from "@/lib/articles";
import { notFound } from "next/navigation";
import CategoryPageContent from "@/components/categories/CategoryPageContent";

type CategoryPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const currentCategory = categories.find((item) => item.slug === category);

  if (!currentCategory) {
    notFound();
  }

  const filteredArticles = articles.filter(
    (article) => article.category === category
  );

  return (
    <CategoryPageContent
      categorySlug={category}
      articles={filteredArticles}
    />
  );
}
