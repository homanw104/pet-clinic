'use client';

import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Grow,
  Paper,
  Stack,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { mountOverlay } from "@/lib/store/overlaySlice";
import ArticleList from "@/components/overlay/ArticleList";
import SidebarTourHeaderBox from "@/components/overlay/SidebarTourHeaderBox";
import OverlayMobileHeader from "@/components/overlay/OverlayMobileHeader";
import ArticleBriefType from "@/lib/types/articleBriefType";

export default function LayoutContent({ title, subtitle, articleBriefList, children }: {
  title: string;
  subtitle: string;
  articleBriefList: ArticleBriefType[];
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useAppDispatch();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  const handleOnclick = (event: React.MouseEvent<HTMLElement>) => {
    // Allow clicking inside the box without toggling close in the parent
    event.stopPropagation();
  }

  /**
   * Mount overlay in case the page is opened via a link
   */
  useEffect(() => {
    dispatch(mountOverlay());
  }, [dispatch]);

  return (
    // Mobile sized screen
    isXsScreen ?
    <Box>
      <Grow
        in={isMount} style={{ transformOrigin: "bottom center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <OverlayMobileHeader section="tour" title={title} subtitle={subtitle} articleBriefList={articleBriefList} />
      </Grow>

      <Grow
        in={isMount} style={{ transformOrigin: "top center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 300 })}
      >
        <Box
          position="absolute"
          top="6.5rem" bottom="1rem"
          left="1rem" right="1rem"
          zIndex="100"
        >
          <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            {children}
          </Paper>
        </Box>
      </Grow>
    </Box>

    // Non-mobile sized screen
    :
    <Grid container height="100lvh" spacing="2rem" minHeight="500px" maxHeight="800px">
      <Grow
        in={isMount} style={{ transformOrigin: "center center" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <Grid item xs={6} sm={5} md={4} lg={3} height="100%">
          <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            <Stack direction="column" height="100%">
              <SidebarTourHeaderBox title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList section="tour" subtitle={subtitle} articleBriefList={articleBriefList} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grow>

      <Grow
        in={isMount} style={{ transformOrigin: "center left" }}
        {...(isMount ? { timeout: 300 } : { timeout: 300 })}
      >
        <Grid item xs={6} sm={7} md={8} lg={9} height="100%">
          <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            {children}
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  )
}
