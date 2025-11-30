"use client";

import OverlayArticleBox from "@/lib/components/overlay/OverlayArticleBox";
import MarkdownArticle from "@/lib/components/atomic/Markdown";
import ArticleDataType from "@/lib/types/ArticleDataType";

export default function PageContent({ article }: {
  article: ArticleDataType;
}) {
  return (
    <OverlayArticleBox>
      <MarkdownArticle>
        {article.content}
      </MarkdownArticle>
    </OverlayArticleBox>
  );
}
