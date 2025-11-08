'use client';

import MarkdownArticle from "@/components/atomic/Markdown";
import ArticleDataType from "@/types/articleDataType";

export default function PageContent({ article }: {
  article: ArticleDataType;
}) {
  return (
    <MarkdownArticle>
      {article.content}
    </MarkdownArticle>
  )
}
