/**
 * 导览 article 页面，根据路径变量 [room] 和 [slug] 生成各房间对应的各个 article。
 */

import React, { ReactElement } from "react";
import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import TourPageLayout from "@/layouts/TourPageLayout";
import MarkdownArticle from "@/components/atomic/Markdown";
import AppGridLayout from "@/layouts/AppGridLayout";
import MockHome from "@/components/app/MockHome";
import ArticleBriefType from "@/types/articleBriefType";
import ArticleDataType from "@/types/articleDataType";
import rooms from "@/contents/rooms";

interface PageProps {
  title: string;
  subtitle: string;
  article: ArticleDataType;
  articleList: ArticleBriefType[];
}

export default function Room({ article }: PageProps) {
  return (
    <MarkdownArticle>
      {article.content}
    </MarkdownArticle>
  )
}

Room.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout overlay={
      <TourPageLayout
        title={page.props.title}
        subtitle={page.props.subtitle}
        articleList={page.props.articleList}
      >
        {page}
      </TourPageLayout>
    }>
      <MockHome />
    </AppGridLayout>
  )
}

interface Params {
  params: {
    room: string;
    slug: string;
  }
}

export async function getStaticProps({ params }: Params) {
  const article = await getArticleBySlug(params.slug, params.room);
  const articleBriefs = await getAllArticleBriefs(params.room);
  const roomInfo = rooms.find((room) => room.subtitle === params.room);

  return {
    props: {
      title: roomInfo?.title,
      subtitle: roomInfo?.subtitle,
      article: article,
      articleList: articleBriefs,
    }
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (const room of rooms) {
    let articleSlugs = await getArticleSlugs(room.subtitle);
    for (const slug of articleSlugs) {
      paths.push({
        params: {
          room: room.subtitle,
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
