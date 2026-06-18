import { articles } from "@/lib/articles";
import ArticleSearch from "@/components/ArticleSearch";

export default function ArticlesPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">全部文章</h1>

      <ArticleSearch articles={articles} />
    </div>
  );
}