/**
 * 兽医职位各流程介绍。
 */

import React from "react";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import JobPageLayout from "@/layouts/job_page_layout";
import MarkdownArticle from "@/components/markdown";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import { getStaticPathsBySubDir, getStaticPropsBySlug } from "@/utils/static_props_util";

const title = "兽医";
const subtitle = "veterinarian";

interface PageProps {
  article: ArticleType;
  articleList: ArticleInfoType[];
}

export default function Veterinarian({ article, articleList }: PageProps) {
  return (
    <JobPageLayout src={veterinarianIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
      <MarkdownArticle className="markdown" key={article.content.substring(0, 40)}>
        {article.content}
      </MarkdownArticle>
    </JobPageLayout>
  )
}

export async function getStaticProps({ params }: { params: { slug: string }}) {
  return await getStaticPropsBySlug(params.slug, subtitle);
}

export async function getStaticPaths() {
  return await getStaticPathsBySubDir(subtitle);
}
