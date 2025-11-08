'use client';

import React, { useEffect } from "react";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import TourSidebarHeaderBox from "@/components/sidebar/TourSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import OverlayViewerBox from "@/components/overlay/OverlayViewerBox";
import ArticleBriefType from "@/types/articleBriefType";
import { mountOverlay } from "@/store/overlaySlice";

export default function PageContent({ chineseTitle, englishID, articleList, panoSrc, panoMarkers }: {
  chineseTitle: string;
  englishID: string;
  articleList: ArticleBriefType[];
  panoSrc: string;
  panoMarkers: MarkerConfig[] | undefined;
}) {
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
              <TourSidebarHeaderBox chineseTitle={chineseTitle} englishID={englishID} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleList} subtitle={englishID} section="tour" />
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
            <OverlayViewerBox
              src={panoSrc ? panoSrc : ""}
              markers={panoMarkers}
            />
          </Paper>
        </Grid>
      </Grow>
    </>
  )
}
