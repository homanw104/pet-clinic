/**
 * Job page layout built upon Home component.
 */

import React from "react";
import { Grid, Paper, } from "@mui/material";
import Home from "@/pages";
import ArticleList from "@/components/sidebar/article_list";
import JobSidebarHeaderBox from "@/components/sidebar/job_sidebar_header_box";
import OverlayArticleBox from "@/components/overlay/overlay_article_box";
import { StaticImageData } from "next/image";
import ArticleInfoType from "@/types/article_info";

interface LayoutProps {
  children: React.ReactNode;
  src: StaticImageData;       // Image data
  alt: string;                // Image description
  title: string;              // Sidebar title
  subtitle: string;           // Sidebar title in English
  articleList: ArticleInfoType[];
}

function Overlay({ children, src, alt, title, subtitle, articleList }: LayoutProps) {
  return (
    <>
      <Grid item sm={3} position="relative">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "0", right: "0",
          overflow: "hidden",
        }}>
          <JobSidebarHeaderBox src={src} alt={alt} title={title} subtitle={subtitle} />
          <ArticleList articleList={articleList} subtitle={subtitle} />
        </Paper>
      </Grid>

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
    </>
  )
}

export default function JobPageLayout({ children, ...props }: LayoutProps) {
  return (
    <Home overlay={
      <Overlay {...props}>{children}</Overlay>
    } />
  )
}
