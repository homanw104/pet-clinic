import { getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import PageContent from "@/app/(intro)/job/[jobName]/[articleSlug]/page-content";
import jobs from "@/contents/jobs";
import { Metadata } from "next";

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

export async function generateMetadata({ params }: {
  params: Promise<{
    jobName: string;
    articleSlug: string;
  }>;
}): Promise<Metadata> {
  const paramsData = await params;
  let title = paramsData.articleSlug.replaceAll("-", " ");
  title = title.charAt(0).toUpperCase() + title.slice(1) + " | Pet Clinic";

  return {
    title: title,
    description: title
  };
}

export default async function Page({ params }: {
  params: Promise<{
    jobName: string;
    articleSlug: string;
  }>;
}) {
  const paramsData = await params;
  const article = await getArticleBySlug(paramsData.articleSlug, paramsData.jobName);

  return (
    <PageContent article={article} />
  )
}
