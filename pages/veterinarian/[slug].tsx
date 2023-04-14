/**
 * 兽医职位各流程介绍。
 */

import React from "react";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import JobPageLayout from "@/layouts/job_page_layout";
import MarkdownArticle from "@/components/markdown";
import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import ArticleType from "@/types/article";
import ArticleInfoType from "@/types/article_info";

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
  const slugs = await getArticleSlugs(subtitle);

  return {
    paths: slugs.map((slug) => {
      return {
        params: { slug: slug },
      };
    }),
    fallback: false,
  }
}
