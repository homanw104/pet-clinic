/**
 * 试卷测试页面，根据试卷 [id] 获取试卷信息。
 */

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Grid, Stack, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import QuizList from "@/components/quiz/QuizList";
import QuizContent from "@/components/quiz/QuizContent";
import AppGridLayout from "@/layouts/AppGridLayout";
import PageNotFound from "@/components/app/PageNotFound";
import quizDataType from "@/types/quizDataType";

export default function Quiz() {
  const theme = useTheme();
  const router = useRouter();

  const [isQueryReady, setIsQueryReady] = useState(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [quizData, setQuizData] = useState<quizDataType>();

  const { id } = router.query;

  // Update isQueryReady state when router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsQueryReady(true);
    }
  }, [router.isReady]);

  // Update pageNoteFound state depending on the value of `id`
  useEffect(() => {
    if (!isQueryReady) return;
    if (typeof id !== "string") {
      // `id` should be a string, if not, set page as not found
      setIsPageNotFound(true);
    } else {
      // Post request to backend with `id` and check the result
    }
  }, [isQueryReady, id]);

  // Fetch quiz data
  useEffect(() => {
    if (!isQueryReady) return;
    setQuizData({
      quizId: 1,
      quizName: "手術準備操作專題",
      questions: [
        {
          questionId: 55,
          description: "你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题？",
          options: ["错误答案甲", "错误答案丙", "正确答案", "错误答案乙"],
          answer: 2,
        },
        {
          questionId: 56,
          description: "你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题？",
          options: ["错误答案甲", "错误答案丙", "正确答案", "错误答案乙"],
          answer: 2,
        },
      ],
    });
  }, [isQueryReady]);

  if (isPageNotFound) return <PageNotFound />;

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="quiz" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <QuizList />
      </Grid>

      <Grid item xs={9}>
        <Box sx={{
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.onMain,
          marginTop: "4rem",
          marginBottom: "4rem",
          marginLeft: "2rem",
          borderRadius: "0.75rem",
          minHeight: "600px",
          padding: "2rem",
        }}>

          {quizData &&
            <QuizContent quizData={quizData} />
          }

          {!quizData &&
            <Stack direction="column" alignItems="center" justifyContent="center" height="600px">
              <CircularProgress />
            </Stack>
          }

        </Box>
      </Grid>
    </>
  )
}

Quiz.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout>
      {page}
    </AppGridLayout>
  )
}
