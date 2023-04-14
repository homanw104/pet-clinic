/**
 * 前台各流程介绍。
 */

import React from "react";
import TourPageLayout from "@/layouts/tour_page_layout";
import MarkdownArticle from "@/components/markdown";
import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";
import { title, subtitle, src, markers } from "@/pages/reception/index";

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

/**
 * Pre-render this page using the slug parameter in the url path.
 * @param slug
 */
export async function getStaticProps({ params }: { params: { slug: string }}) {
  const subDir = subtitle;
  const article = await getArticleBySlug(params.slug, subDir);
  const articleBriefs = await getAllArticleBriefs(subDir);

  return {
    props: {
      articleList: articleBriefs,
      article: {
        slug: article.slug,
        date: article.date,
        title: article.title,
        content: article.content,
      },
    },
  }
}

/**
 * Define all pages that need to pre-render by searching down the file system
 * using getArticleSlugs().
 */
export async function getStaticPaths() {
  let slugs: string[];
  slugs = await getArticleSlugs(subtitle);

  return {
    paths: slugs.map((slug) => {
      return {
        params: { slug: slug },
      };
    }),
    fallback: false,
  }
}
