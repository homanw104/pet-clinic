/**
 * Tour page layout.
 * Place this layout inside a Grid layout.
 */

import React from "react";
import { Grid, Paper } from "@mui/material";
import ArticleList from "@/components/sidebar/article_list";
import TourSidebarHeaderBox from "@/components/sidebar/tour_sidebar_header_box";
import OverlayViewerBox from "@/components/overlay/overlay_viewer_box";
import OverlayArticleBox from "@/components/overlay/overlay_article_box";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import ArticleInfoType from "@/types/article_info";

interface LayoutProps {
  children?: React.ReactNode;   // Optional when displaying panorama
  title: string;                // Sidebar title
  subtitle: string;             // Sidebar title in English
  articleList: ArticleInfoType[];
  panoSrc?: string;             // Panorama source
  panoMarkers?: MarkerConfig[]; // Panorama markers
}

export default function TourPageLayout({ children, title, subtitle, articleList, panoSrc, panoMarkers }: LayoutProps) {
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

          {/* Display panorama when given panorama source file */}
          {panoSrc && <OverlayViewerBox
            src={panoSrc ? panoSrc : ""}
            markers={panoMarkers}
          />}

          {/* Else, display children in OverlayArticleBox */}
          {!panoSrc && <OverlayArticleBox
            article={children}
          />}

        </Paper>
      </Grid>
    </>
  )
}
