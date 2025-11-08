'use client';

import { useEffect } from "react";
import { StaticImageData } from "next/image";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import JobSidebarHeaderBox from "@/components/sidebar/JobSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";
import MarkdownArticle from "@/components/atomic/Markdown";
import ArticleBriefType from "@/types/articleBriefType";
import ArticleDataType from "@/types/articleDataType";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";

export default function PageContent({ imgSrc, imgAlt, chineseTitle, englishID, articleBriefList, article }: {
  imgSrc: StaticImageData;
  imgAlt: string;
  chineseTitle: string;
  englishID: string;
  articleBriefList: ArticleBriefType[];
  article: ArticleDataType;
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
              <JobSidebarHeaderBox src={imgSrc} alt={imgAlt} title={chineseTitle} subtitle={englishID} />
              <Box sx={{ overflow: "scroll", flexGrow: 1 }}>
                <ArticleList articleBriefList={articleBriefList} subtitle={englishID} section="job" />
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
            <OverlayArticleBox>
              <MarkdownArticle>
                {article.content}
              </MarkdownArticle>
            </OverlayArticleBox>
          </Paper>
        </Grid>
      </Grow>
    </>
  )
}
