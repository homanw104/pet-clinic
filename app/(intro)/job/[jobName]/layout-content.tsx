'use client';

import React, { useEffect } from "react";
import { StaticImageData } from "next/image";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { mountOverlay } from "@/lib/store/overlaySlice";
import JobSidebarHeaderBox from "@/components/sidebar/JobSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import ArticleBriefType from "@/lib/types/articleBriefType";

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
    <Grid container height="100vh" minHeight="500px" maxHeight="800px" spacing="2rem">
      <Grow
        in={isMount}
        style={{ transformOrigin: "center center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <Grid item sm={3} height="100%">
          <Paper
            sx={{
              height: "100%",
              overflow: "hidden",
              borderRadius: "1rem"
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
        <Grid item sm={9} height="100%">
          <Paper
            sx={{
              height: "100%",
              overflow: "hidden",
              borderRadius: "1rem"
            }}

            // Allow clicking inside the box without toggling close in the parent
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  )
}
