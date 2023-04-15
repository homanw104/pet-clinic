/**
 * 前台职位各流程介绍。
 */

import React from "react";
import receptionistIcon from "@/public/avatar/receptionist.png";
import JobPageLayout from "@/layouts/job_page_layout";
import MarkdownArticle from "@/components/markdown";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import { getStaticPathsBySubDir, getStaticPropsBySlug } from "@/utils/static_props_util";

const title = "前台";
const subtitle = "receptionist";

interface PageProps {
  article: ArticleType;
  articleList: ArticleInfoType[];
}

export default function Receptionist({ article, articleList }: PageProps) {
  return (
    <JobPageLayout src={receptionistIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
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
