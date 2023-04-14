import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";

/**
 * Return props needed to pre-render a page,
 * based on the given file name and subdirectory.
 * @param slug file name without suffix, e.g. "intro"
 * @param subDir e.g. "veterinarian", "technician"
 */
export async function getStaticPropsBySlug(slug: string, subDir: string) {
  const article = await getArticleBySlug(slug, subDir);
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
 * Return a list of pages to pre-render,
 * based on files in the given subdirectory.
 * @param subDir e.g. "veterinarian", "technician"
 */
export async function getStaticPathsBySubDir(subDir: string) {
  const slugs = await getArticleSlugs(subDir);

  return {
    paths: slugs.map((slug) => {
      return {
        params: { slug: slug },
      };
    }),
    fallback: false,
  };
}
