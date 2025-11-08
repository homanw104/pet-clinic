'use client';

import { StaticImageData } from "next/image";
import { Box, Grid, Grow, Paper, Stack } from "@mui/material";
import JobSidebarHeaderBox from "@/components/sidebar/JobSidebarHeaderBox";
import ArticleList from "@/components/sidebar/ArticleList";
import OverlayArticleBox from "@/components/overlay/OverlayArticleBox";
import MarkdownArticle from "@/components/atomic/Markdown";
import ArticleBriefType from "@/types/articleBriefType";
import ArticleDataType from "@/types/articleDataType";

interface ComponentProps {
  imgSrc: StaticImageData;
  imgAlt: string;
  chineseTitle: string;
  englishID: string;
  articleBriefList: ArticleBriefType[];
  article: ArticleDataType;
}

export default function Cards({imgSrc, imgAlt, chineseTitle, englishID, articleBriefList, article}: ComponentProps) {
  return (
    <>
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

      <Grow in style={{ transformOrigin: "center left" }}>
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
