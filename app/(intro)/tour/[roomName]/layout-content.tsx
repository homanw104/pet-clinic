'use client';

import React, { useEffect } from "react";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";
import ArticleList from "@/components/sidebar/ArticleList";
import TourSidebarHeaderBox from "@/components/sidebar/TourSidebarHeaderBox";
import ArticleBriefType from "@/types/articleBriefType";

export default function LayoutContent({ title, subtitle, articleBriefList, children }: {
  title: string;
  subtitle: string;
  articleBriefList: ArticleBriefType[];
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  useEffect(() => {
    dispatch(mountOverlay());
  }, [dispatch]);

  return (
    <>
      <Grow
        in={isMount}
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
            <Stack direction="column" height="100%">
              <TourSidebarHeaderBox title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleBriefList} subtitle={subtitle} section="tour" />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grow>

      <Grow
        in={isMount}
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
            {children}
          </Paper>
        </Grid>
      </Grow>
    </>
  )
}