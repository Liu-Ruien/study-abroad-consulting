import { articles } from "@/lib/articles";
import { notFound } from "next/navigation";
import ArticleDetailContent from "@/components/articles/ArticleDetailContent";

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

  return <ArticleDetailContent article={article} />;
}
