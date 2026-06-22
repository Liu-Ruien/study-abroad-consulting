/**
 * 文章卡片组件
 * 作用：在首页、文章列表页、分类页中展示单篇文章的摘要信息
 */

import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getCategoryName } from "@/lib/articles";
import {
  articleCardHover,
  getArticleCardTone,
  getArticleTagTone,
} from "@/lib/ui/card-system";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export default function ArticleCard({ article, className = "" }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block p-5 sm:p-6 ${getArticleCardTone(article.category)} ${articleCardHover} ${className}`}
    >
      <div className="mb-3 flex items-center gap-2 text-xs">
        <span className={getArticleTagTone(article.category)}>
          {getCategoryName(article.category)}
        </span>
        <span className="text-gray-500">约 3 分钟阅读</span>
      </div>

      <h2 className="mb-2 text-lg font-semibold leading-snug text-gray-950 group-hover:text-gray-900">
        {article.title}
      </h2>

      <p className="text-sm leading-relaxed text-gray-700">{article.excerpt}</p>
    </Link>
  );
}
