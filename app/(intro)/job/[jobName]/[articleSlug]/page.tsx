/**
 * 职位 article 页面，根据路径变量 [jobName] 和 [articleSlug] 生成各职位对应的各个 article。
 */

import { StaticImageData } from "next/image";
import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import PageContent from "@/app/(intro)/job/[jobName]/[articleSlug]/page-content";
import JobBriefType from "@/types/jobBriefType";
import jobs from "@/contents/jobs";

export async function generateStaticParams() {
  let paramsList: { jobName: string; articleSlug: string }[] = [];

  for (const jobBrief of jobs) {
    const articleSlugs = await getArticleSlugs(jobBrief.englishID);
    paramsList.push(
      ...articleSlugs.map((slug) => ({
        jobName: jobBrief.englishID,
        articleSlug: slug,
      }))
    );
  }

  return paramsList;
}

export default async function Page({ params }: {
  params: Promise<{
    jobName: string;
    articleSlug: string;
  }>;
}) {
  const paramsData = await params;
  const article = await getArticleBySlug(paramsData.articleSlug, paramsData.jobName);
  const articleBriefList = await getAllArticleBriefs(paramsData.jobName);
  const jobBrief = jobs.find((job) => job.englishID === paramsData.jobName) ?? {
    chineseTitle: "未知",
    englishID: "unknown",
    avatar: {} as StaticImageData
  } as JobBriefType;

  const src = jobBrief.avatar;
  const alt = jobBrief.chineseTitle;
  const chineseTitle = jobBrief.chineseTitle;
  const englishID = jobBrief.englishID;

  return (
    <PageContent imgSrc={src} imgAlt={alt} chineseTitle={chineseTitle} englishID={englishID} articleBriefList={articleBriefList} article={article} />
  )
}
