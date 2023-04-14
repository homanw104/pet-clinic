/**
 * 前台区各流程介绍。
 */

import React from "react";
import TourPageLayout from "@/layouts/tour_page_layout";
import MarkdownArticle from "@/components/markdown";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import { title, subtitle, src, markers } from "@/pages/reception/index";
import { getStaticPathsBySubDir, getStaticPropsBySlug } from "@/utils/static_props_util";

interface PageProps {
  article: ArticleType;
  articleList: ArticleInfoType[];
}

export default function Reception({ article, articleList }: PageProps) {
  return (
    <TourPageLayout
      title={title}
      subtitle={subtitle}
      articleList={articleList}
      src={src}
      markers={markers}
    >
      <MarkdownArticle>
        {article.content}
      </MarkdownArticle>
    </TourPageLayout>
  )
}

export async function getStaticProps({ params }: { params: { slug: string }}) {
  return await getStaticPropsBySlug(params.slug, subtitle);
}

export async function getStaticPaths() {
  return await getStaticPathsBySubDir(subtitle);
}
