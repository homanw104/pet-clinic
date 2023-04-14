/**
 * Tour page layout built upon Home component.
 */

import React from "react";
import { Grid, Paper } from "@mui/material";
import Home from "@/pages";
import ArticleList from "@/components/sidebar/article_list";
import TourSidebarHeaderBox from "@/components/sidebar/tour_sidebar_header_box";
import OverlayViewerBox from "@/components/overlay/overlay_viewer_box";
import OverlayArticleBox from "@/components/overlay/overlay_article_box";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import ArticleInfoType from "@/types/article_info";

interface LayoutProps {
  children?: React.ReactNode; // Optional when displaying panorama
  title: string;              // Sidebar title
  subtitle: string;           // Sidebar title in English
  articleList: ArticleInfoType[];
  src: string;                // Panorama source
  markers: MarkerConfig[];    // Panorama markers
}

function Overlay({ children, title, subtitle, articleList, src, markers }: LayoutProps) {
  return (
    <>
      <Grid item sm={3} position="relative">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "0", right: "0",
          overflow: "hidden",
        }}>
          <TourSidebarHeaderBox title={title} subtitle={subtitle} />
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
          <OverlayViewerBox src={src} markers={markers} />
          {/* Display article when children is present */}
          {children && <OverlayArticleBox article={children} />}
        </Paper>
      </Grid>
    </>
  )
}

export default function TourPageLayout({ children, ...props }: LayoutProps) {
  return (
    <Home overlay={
      <Overlay {...props}>{children}</Overlay>
    } />
  )
}
