/**
 * 医助职位各流程介绍。
 */

import React from "react";
import technicianIcon from "@/public/avatar/technician.png";
import JobPageLayout from "@/layouts/job_page_layout";
import MarkdownArticle from "@/components/markdown";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import { getStaticPathsBySubDir, getStaticPropsBySlug } from "@/utils/static_props_util";

const title = "医助";
const subtitle = "technician";

interface PageProps {
  article: ArticleType;
  articleList: ArticleInfoType[];
}

export default function Technician({ article, articleList }: PageProps) {
  return (
    <JobPageLayout src={technicianIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
      <MarkdownArticle>
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
