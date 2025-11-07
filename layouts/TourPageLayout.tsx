/**
 * Tour page layout.
 * Place this layout inside a Grid layout.
 */

import React, { useEffect } from "react";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import ArticleList from "@/components/sidebar/ArticleList";
import TourSidebarHeaderBox from "@/components/sidebar/TourSidebarHeaderBox";
import OverlayViewerBox from "@/components/overlay/OverlayViewerBox";
import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import ArticleBriefType from "@/types/articleBriefType";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";

interface LayoutProps {
  children?: React.ReactNode;   // Optional when displaying panorama
  title: string;                // Sidebar title
  subtitle: string;             // Sidebar title in English
  articleList: ArticleBriefType[];
  panoSrc?: string;             // Panorama source
  panoMarkers?: MarkerConfig[]; // Panorama markers
}

export default function TourPageLayout({ children, title, subtitle, articleList, panoSrc, panoMarkers }: LayoutProps) {
  const dispatch = useAppDispatch();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  useEffect(() => {
    dispatch(mountOverlay());
  }, [dispatch]);

  return (
    <>
      <Grow
        in={isMount} mountOnEnter unmountOnExit
        style={{ transformOrigin: "bottom right" }}
        {...(isMount ? { timeout: 330 } : { timeout: 300 })}
      >
        <Grid item sm={3} position="relative">
          <Paper sx={{
            position: "absolute",
            top: "2rem", bottom: "2rem",
            left: "0", right: "0",
            overflow: "hidden",
          }}>
            <Stack direction="column" height="100%">
              <TourSidebarHeaderBox title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleList} subtitle={subtitle} section="tour" />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grow>

      <Grow
        in={isMount} mountOnEnter unmountOnExit
        style={{ transformOrigin: "bottom center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 300 })}
      >
        <Grid item sm={9} position="relative">
          <Paper sx={{
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
              children={children}
            />}

          </Paper>
        </Grid>
      </Grow>
    </>
  )
}
