'use client';

import React, { useEffect } from "react";
import { StaticImageData } from "next/image";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";
import JobSidebarHeaderBox from "@/components/sidebar/JobSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import ArticleBriefType from "@/types/articleBriefType";

export default function LayoutContent({ imgSrc, imgAlt, title, subtitle, articleBriefList, children }: {
  imgSrc: StaticImageData;
  imgAlt: string;
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
          <Paper
            sx={{
              position: "absolute",
              top: "2rem", bottom: "2rem",
              left: "0", right: "0",
              overflow: "hidden",
            }}

            // Allow clicking inside the box without toggling close in the parent
            onClick={(e) => e.stopPropagation()}
          >
            <Stack direction="column" height="100%">
              <JobSidebarHeaderBox src={imgSrc} alt={imgAlt} title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleBriefList} subtitle={subtitle} section="job" />
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
          <Paper
            sx={{
              position: "absolute",
              top: "2rem", bottom: "2rem",
              left: "2rem", right: "0",
              overflow: "hidden",
            }}

            // Allow clicking inside the box without toggling close in the parent
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Paper>
        </Grid>
      </Grow>
    </>
  )
}
