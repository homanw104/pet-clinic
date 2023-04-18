/**
 * Job page layout.
 * Place this layout inside a Grid layout.
 */

import React from "react";
import { Grid, Grow, Paper } from "@mui/material";
import ArticleList from "@/components/sidebar/article_list";
import JobSidebarHeaderBox from "@/components/sidebar/job_sidebar_header_box";
import OverlayArticleBox from "@/components/overlay/overlay_article_box";
import { StaticImageData } from "next/image";
import ArticleInfoType from "@/types/article_info";
import { useAppSelector } from "@/app/hooks";

interface LayoutProps {
  children: React.ReactNode;
  src: StaticImageData;       // Image data
  alt: string;                // Image description
  title: string;              // Sidebar title
  subtitle: string;           // Sidebar title in English
  articleList: ArticleInfoType[];
}

export default function JobPageLayout({ children, src, alt, title, subtitle, articleList }: LayoutProps) {
  const isMount = useAppSelector((state) => state.overlay.isMount);

  return (
    <>
      <Grow
        in={isMount} mountOnEnter unmountOnExit
        style={{ transformOrigin: "center center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <Grid item sm={3} position="relative">
          <Paper style={{
            position: "absolute",
            top: "2rem", bottom: "2rem",
            left: "0", right: "0",
            overflow: "hidden",
          }}>
            <JobSidebarHeaderBox src={src} alt={alt} title={title} subtitle={subtitle} />
            <ArticleList articleList={articleList} linkPrefix={`/job/${subtitle}`} />
          </Paper>
        </Grid>
      </Grow>

      <Grow
        in={isMount} mountOnEnter unmountOnExit
        style={{ transformOrigin: "center left" }}
        {...(isMount ? { timeout: 300 } : { timeout: 300 })}
      >
        <Grid item sm={9} position="relative">
          <Paper style={{
            position: "absolute",
            top: "2rem", bottom: "2rem",
            left: "2rem", right: "0",
            overflow: "hidden",
          }}>
            <OverlayArticleBox article={children} />
          </Paper>
        </Grid>
      </Grow>
    </>
  )
}
