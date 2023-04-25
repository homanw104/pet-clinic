/**
 * 导览主页，根据路径变量 [room] 生成各房间对应的主页。
 */

import React, { ReactElement } from "react";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import { getAllArticleBriefs } from "@/utils/article_util";
import TourPageLayout from "@/layouts/TourPageLayout";
import AppGridLayout from "@/layouts/AppGridLayout";
import Home from "@/pages";
import ArticleBriefType from "@/types/articleBriefType";
import rooms from "@/contents/rooms";

interface PageProps {
  title: string;
  subtitle: string;
  panoSrc: string;
  panoMarkers: MarkerConfig[];
  articleList: ArticleBriefType[];
}

export default function Room(props: PageProps) {
  // `props` is used in Room.getLayout()
  // No MarkdownArticle is returned in tour index
  return null;
}

Room.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout overlay={
      <TourPageLayout
        title={page.props.title}
        subtitle={page.props.subtitle}
        panoSrc={page.props.panoSrc}
        panoMarkers={page.props.panoMarkers}
        articleList={page.props.articleList}
      >
        {page}
      </TourPageLayout>
    }>
      <Home />
    </AppGridLayout>
  )
}

interface Params {
  params: {
    room: string;
  }
}

export async function getStaticProps({ params }: Params) {
  const articleBriefs = await getAllArticleBriefs(params.room);
  const roomInfo = rooms.find((room) => room.subtitle === params.room);

  return {
    props: {
      title: roomInfo?.title,
      subtitle: roomInfo?.subtitle,
      panoSrc: roomInfo?.panoSrc,
      panoMarkers: roomInfo?.panoMarkers,
      articleList: articleBriefs,
    }
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (const room of rooms) {
    paths.push({
      params: {
        room: room.subtitle,
      },
    })
  }
  
  return {
    paths: paths,
    fallback: false,
  };
}
