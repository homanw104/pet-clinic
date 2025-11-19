'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StaticImageData } from "next/image";
import {
  Box,
  Collapse,
  Grid,
  Grow,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { mountOverlay, unmountOverlay } from "@/lib/store/overlaySlice";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMount = useAppSelector((state) => state.overlay.isMount);

  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isArticleListOpen, setIsArticleListOpen] = useState(false);

  const handleToggleArticleList = () => {
    setIsArticleListOpen(!isArticleListOpen);
  };

  const handleCloseOverlay = () => {
    dispatch(unmountOverlay());
    setTimeout(() => router.push("/"), 300);
  };

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
        in={isMount} style={{ transformOrigin: "bottom left" }}
        {...(isMount ? { timeout: 300 } : { timeout: 350 })}
      >
        <Box
          position="absolute" zIndex="200"
          top="1rem" left="1rem" right="1rem"
          height={isArticleListOpen ? "100%" : "6.5rem"}
        >
          <Paper sx={{ overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
            <Stack direction="column">
              <Stack direction="row" justifyContent="space-between" height="4.5rem" padding="1rem">
                <Stack direction="row" alignItems="center">
                  <IconButton onClick={handleToggleArticleList}><MenuIcon /></IconButton>
                  <Typography marginLeft="0.5rem" variant="h6">{title}</Typography>
                </Stack>
                <IconButton onClick={handleCloseOverlay}><CloseIcon /></IconButton>
              </Stack>
              <Collapse onClick={handleToggleArticleList} in={isArticleListOpen}>
                <Box maxHeight="calc(100lvh - 6.5rem)" overflow="auto">
                  <ArticleList articleBriefList={articleBriefList} subtitle={subtitle} section="job" />
                </Box>
              </Collapse>
            </Stack>
          </Paper>
        </Box>
      </Grow>

      <Grow
        in={isMount} style={{ transformOrigin: "top left" }}
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
              <JobSidebarHeaderBox src={imgSrc} alt={imgAlt} title={title} subtitle={subtitle} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleBriefList} subtitle={subtitle} section="job" />
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
