import { articles } from "@/lib/articles";
import ArticlesPageContent from "@/components/articles/ArticlesPageContent";

export default function ArticlesPage() {
  return <ArticlesPageContent articles={articles} />;
}
