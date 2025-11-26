"use client";

import React from "react";
import MarkdownArticle from "@/lib/components/atomic/Markdown";
import OverlayArticleBox from "@/lib/components/overlay/OverlayArticleBox";
import ArticleDataType from "@/lib/types/articleDataType";

export default function PageContent({ article }: {
  article: ArticleDataType;
}) {
  return (
    <>
      <OverlayArticleBox>
        <MarkdownArticle>
          {article.content}
        </MarkdownArticle>
      </OverlayArticleBox>
    </>
  );
}
