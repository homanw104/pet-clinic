'use client';

import React from "react";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import { useAppSelector } from "@/utils/hook_util";
import TourSidebarHeaderBox from "@/components/sidebar/TourSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import MarkdownArticle from "@/components/atomic/Markdown";
import ArticleBriefType from "@/types/articleBriefType";
import ArticleDataType from "@/types/articleDataType";
import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";

export default function PageContent({ chineseTitle, englishID, articleList, article }: {
  chineseTitle: string;
  englishID: string;
  articleList: ArticleBriefType[];
  article: ArticleDataType;
}) {
  const isMount = useAppSelector((state) => state.overlay.isMount);

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
