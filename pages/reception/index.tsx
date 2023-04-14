/**
 * 前台区主页。
 */

import React from "react";
import ArticleInfoType from "@/types/article_info";
import { getAllArticleBriefs } from "@/utils/article_util";
import TourPageLayout from "@/layouts/tour_page_layout";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";

export const title = "前台区";
export const subtitle = "reception";
export const src = "/pano/test.jpg";
export const markers: MarkerConfig[] = [
  {
    id: "test-marker",
    position: { yaw: "45deg", pitch: "0deg" },
    image: "pin-blue.png",
    size: { width: 32, height: 32 },
  },
];

interface PageProps {
  articleList: ArticleInfoType[];
}

export default function Reception({ articleList }: PageProps) {
  return (
    <TourPageLayout
      title={title}
      subtitle={subtitle}
      articleList={articleList}
      src={src}
      markers={markers}
    />
  )
}

/**
 * Fetch the list of articles and pre-render this page.
 */
export async function getStaticProps() {
  const articleBriefs = await getAllArticleBriefs(subtitle);

  return {
    props: {
      articleList: articleBriefs,
    },
  }
}
