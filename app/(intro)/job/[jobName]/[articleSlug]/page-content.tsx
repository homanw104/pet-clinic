'use client';

import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";
import MarkdownArticle from "@/components/atomic/Markdown";
import ArticleDataType from "@/lib/types/articleDataType";

export default function PageContent({ article }: {
  article: ArticleDataType;
}) {
  return (
    <OverlayArticleBox>
      <MarkdownArticle>
        {article.content}
      </MarkdownArticle>
    </OverlayArticleBox>
  )
}
