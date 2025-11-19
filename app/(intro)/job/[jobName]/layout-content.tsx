'use client';

import React, { useEffect } from "react";
import { StaticImageData } from "next/image";
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
import SidebarJobHeaderBox from "@/components/overlay/SidebarJobHeaderBox";
import ArticleList from "@/components/overlay/ArticleList";
import OverlayMobileHeader from "@/components/overlay/OverlayMobileHeader";
import ArticleBriefType from "@/lib/types/articleBriefType";

export default function LayoutContent({ imgSrc, imgAlt, title, subtitle, articleBriefList, children }: {
  imgSrc: StaticImageData;
  imgAlt: string;
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
  };

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
        <OverlayMobileHeader section="job" title={title} subtitle={subtitle} articleBriefList={articleBriefList} />
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
        <Grid item xs={0} sm={5} md={4} lg={3} height="100%">
          <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            <Stack direction="column" height="100%">
              <SidebarJobHeaderBox src={imgSrc} alt={imgAlt} title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList section="job" subtitle={subtitle} articleBriefList={articleBriefList} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grow>

      <Grow
        in={isMount} style={{ transformOrigin: "center left" }}
        {...(isMount ? { timeout: 300 } : { timeout: 300 })}
      >
        <Grid item xs={12} sm={7} md={8} lg={9} height="100%">
          <Paper sx={{ height: "100%", overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            {children}
          </Paper>
        </Grid>
      </Grow>
    </Grid>
  )
}
