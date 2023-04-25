/**
 * Methods to get articles from the file system.
 */

import fs from "fs";
import readline from "readline";
import { join } from "path";
import ArticleDataType from "@/types/articleDataType";
import ArticleBriefType from "@/types/articleBriefType";

const baseDir = process.cwd();
const contentDir = `${baseDir}/contents`;

/**
 * Return the first line of the file, truncating the leading "# ".
 * @param filePath Full file path starting with "/".
 */
function getTitle(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({ input: readStream });

    rl.on("line", (line) => {
      resolve(line.replace(/^# /, ""));
      rl.close();
      readStream.destroy();
    });

    rl.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * Return the creation date of the file.
 * @param filePath Full file path starting with "/".
 */
function getCreationDate(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.birthtime.toString());
      }
    });
  });
}

/**
 * Return the list of articles' slugs.
 * @param subDir "veterinarian", "technician", etc.
 */
export function getArticleSlugs(subDir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const fullDir = join(contentDir, subDir);
    fs.readdir(fullDir, (err, slugs) => {
      if (err) {
        reject(err);
      } else {
        resolve(slugs.map((slug) => slug.replace(/\.md$/, "")));
      }
    });
  });
}

/**
 * Return a ArticleType Promise in the given directory.
 * @param slug "index", "intro", etc.
 * @param subDir "veterinarian", "technician", etc.
 */
export function getArticleBySlug(slug: string, subDir: string): Promise<ArticleDataType> {
  const fullDir = join(contentDir, subDir);
  const fullPath = join(fullDir, `${slug}.md`);

  return new Promise((resolve, reject) => {
    Promise.all([getCreationDate(fullPath), getTitle(fullPath)])
      .then(([date, title]) => {
        resolve({
          slug: slug,
          date: date,
          title: title,
          content: fs.readFileSync(fullPath, "utf8"),
        })
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Return a ArticleBriefType Promise in the given directory.
 * @param slug "index", "intro", etc.
 * @param subDir "veterinarian", "technician", etc.
 */
export function getArticleBriefBySlug(slug: string, subDir: string): Promise<ArticleBriefType> {
  const fullDir = join(contentDir, subDir);
  const fullPath = join(fullDir, `${slug}.md`);

  return new Promise((resolve, reject) => {
    Promise.all([getCreationDate(fullPath), getTitle(fullPath)])
      .then(([date, title]) => {
        resolve({
          slug: slug,
          date: date,
          title: title,
        })
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Return a list of ArticleBriefType Promise in the given directory.
 * @param subDir "veterinarian", "technician", etc.
 */
export function getAllArticleBriefs(subDir: string): Promise<ArticleBriefType[]> {
  return new Promise((resolve, reject) => {
    getArticleSlugs(subDir)
      .then(slugs => {
        Promise.all(slugs.map((slug) => getArticleBriefBySlug(slug, subDir)))
          .then(slugs => resolve(slugs))
          .catch(err => reject(err));
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * Return a list of ArticleType Promise in the given directory.
 * @param subDir "veterinarian", "technician", etc.
 */
export function getAllArticles(subDir: string): Promise<ArticleDataType[]> {
  return new Promise((resolve, reject) => {
    getArticleSlugs(subDir)
      .then(slugs => {
        Promise.all(slugs.map((slug) => getArticleBySlug(slug, subDir)))
          .then(slugs => resolve(slugs))
          .catch(err => reject(err));
      })
      .catch(err => {
        reject(err);
      });
  });
}
