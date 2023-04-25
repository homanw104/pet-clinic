/**
 * Job page layout.
 * Place this layout inside a Grid layout.
 */

import React, { useEffect } from "react";
import { StaticImageData } from "next/image";
import { Grid, Grow, Paper } from "@mui/material";
import ArticleList from "@/components/sidebar/ArticleList";
import JobSidebarHeaderBox from "@/components/sidebar/JobSidebarHeaderBox";
import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";
import ArticleBriefType from "@/types/articleBriefType";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";

interface LayoutProps {
  children: React.ReactNode;
  src: StaticImageData;       // Image data
  alt: string;                // Image description
  title: string;              // Sidebar title
  subtitle: string;           // Sidebar title in English
  articleList: ArticleBriefType[];
}

export default function JobPageLayout({ children, src, alt, title, subtitle, articleList }: LayoutProps) {
  const dispatch = useAppDispatch();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  useEffect(() => {
    dispatch(mountOverlay());
  }, [dispatch]);

  return (
    <>
      <Grow
        in={isMount} mountOnEnter unmountOnExit
        style={{ transformOrigin: "center center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <Grid item sm={3} position="relative">
          <Paper sx={{
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
          <Paper sx={{
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
