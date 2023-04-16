/**
 * 职位 article 页面，根据路径变量 [job] 和 [slug] 生成各职位对应的各个 article。
 */

import React, { ReactElement } from "react";
import { StaticImageData } from "next/image";
import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import JobPageLayout from "@/layouts/job_page_layout";
import MarkdownArticle from "@/components/atomic/markdown";
import AppGridLayout from "@/layouts/app_grid_layout";
import Home from "@/pages";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import jobs from "@/contents/jobs";

interface PageProps {
  title: string;
  subtitle: string;
  avatar: StaticImageData;
  article: ArticleType;
  articleList: ArticleInfoType[];
}

export default function Job({ article }: PageProps) {
  return (
    <MarkdownArticle>
      {article.content}
    </MarkdownArticle>
  )
}

Job.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout overlay={
      <JobPageLayout
        title={page.props.title}
        subtitle={page.props.subtitle}
        articleList={page.props.articleList}
        src={page.props.avatar}
        alt={page.props.subtitle}
      >
        {page}
      </JobPageLayout>
    }>
      <Home />
    </AppGridLayout>
  )
}

interface Params {
  params: {
    job: string;
    slug: string;
  }
}

export async function getStaticProps({ params }: Params) {
  const article = await getArticleBySlug(params.slug, params.job);
  const articleBriefs = await getAllArticleBriefs(params.job);
  const jobInfo = jobs.find((job) => job.subtitle === params.job);

  return {
    props: {
      title: jobInfo?.title,
      subtitle: jobInfo?.subtitle,
      avatar: jobInfo?.avatar,
      article: article,
      articleList: articleBriefs,
    }
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (const jobInfo of jobs) {
    let articleSlugs = await getArticleSlugs(jobInfo.subtitle);
    for (const slug of articleSlugs) {
      paths.push({
        params: {
          job: jobInfo.subtitle,
          slug: slug,
        },
      });
    }
  }

  return {
    paths: paths,
    fallback: false,
  };
}
