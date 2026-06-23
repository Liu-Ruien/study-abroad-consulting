import type { Language } from "@/lib/i18n/language";
import { getCategoryLabel } from "@/lib/i18n/ui-strings";
import type { Article } from "@/lib/articles";

export type LocalizedArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  categoryLabel: string;
  readTime: string;
};

export function formatReadTime(language: Language, minutes = 3): string {
  switch (language) {
    case "ja":
      return `約 ${minutes} 分で読めます`;
    case "en":
      return `About ${minutes} min read`;
    default:
      return `约 ${minutes} 分钟阅读`;
  }
}

export function getLocalizedArticle(
  article: Article,
  language: Language
): LocalizedArticle {
  return {
    slug: article.slug,
    category: article.category,
    title: article.title[language],
    excerpt: article.excerpt[language],
    content: article.content[language],
    categoryLabel: getCategoryLabel(language, article.category),
    readTime: formatReadTime(language, article.readMinutes),
  };
}

export function getArticleSearchText(
  article: Article,
  language: Language
): string {
  return [
    article.title[language],
    article.excerpt[language],
    ...article.content[language],
  ]
    .join(" ")
    .toLowerCase();
}
