/**
 * 文章卡片组件
 * 在列表页和分类页复用，展示标题、简介、分类与阅读时间
 */
import Link from "next/link";
import { Article, getCategoryName } from "@/lib/articles";

/** 组件入参：一篇完整的文章对象 */
interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Link
          href={`/categories/${article.category}`}
          className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-100"
        >
          {getCategoryName(article.category)}
        </Link>
        <span className="text-xs text-slate-400">{article.readingTime} 分钟阅读</span>
      </div>

      <h2 className="mb-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-sky-700">
        <Link href={`/articles/${article.slug}`}>{article.title}</Link>
      </h2>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
        {article.excerpt}
      </p>

      <Link
        href={`/articles/${article.slug}`}
        className="inline-flex items-center text-sm font-medium text-sky-600 transition-colors hover:text-sky-800"
      >
        阅读全文
        <span className="ml-1 transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
