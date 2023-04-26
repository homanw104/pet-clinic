/**
 * 试卷测试页面，根据试卷 [id] 获取试卷信息。
 */

import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box, Button,
  CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText, DialogTitle,
  Fade,
  Grid,
  Stack,
  useTheme
} from "@mui/material";
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

  // When isDialogActive is true, a warning is shown to ask use whether to discard their changes
  const [isDialogActive, setIsDialogActive] = useState(false);

  // Timeouts are set between setIsLoading and setIsLoaded to allow animations to play
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isQueryReady, setIsQueryReady] = useState(false);
  const [isPageNotFound, setIsPageNotFound] = useState(false);
  const [quizData, setQuizData] = useState<quizDataType>();

  const { id } = router.query;

  const handleRandomQuestion = () => {
    setIsDialogActive(true);
  };

  const handleDialogCancel = () => {
    setIsDialogActive(false);
  };

  const handleDialogConfirm = () => {
    setIsDialogActive(false);
    router.push("/quiz").then();
  };

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
    // Quit if query is not even ready
    if (!isQueryReady) return;

    // Timeout reference
    let loadingTimeout: NodeJS.Timeout;
    let loadedTimeout: NodeJS.Timeout;

    // Set to loading state before fetching quiz data
    setIsLoaded(false);
    loadingTimeout = setTimeout(() => { setIsLoading(true) }, 250);

    // Simulate network delay
    setTimeout(() => {
      // Fetch quiz data
      setQuizData({
        quizId: 1,
        quizName: "手術準備操作專題（样例数据）",
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
      setIsLoading(false);
      clearTimeout(loadingTimeout);
      loadedTimeout = setTimeout(() => { setIsLoaded(true) }, 250);
    }, 3000);

    // Clear timeouts when unmount
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(loadedTimeout);
    }
  }, [isQueryReady]);

  if (isPageNotFound) return <PageNotFound />;

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="quiz" onRandomQuestion={handleRandomQuestion} />
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

          <Fade in={isLoaded} unmountOnExit>
            <Box>
              <QuizContent quizData={quizData ? quizData : { quizId: 0, quizName: "", questions: [] }} />
            </Box>
          </Fade>

          <Fade in={isLoading} style={{ transitionDelay: "500ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="600px">
              <CircularProgress />
            </Stack>
          </Fade>

        </Box>
      </Grid>

      <Dialog
        open={isDialogActive}
        onClose={handleDialogCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          返回随机测试
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            点击确定将清除当前测试进度并返回随机测试！
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogCancel}>取消</Button>
          <Button onClick={handleDialogConfirm} autoFocus>确定</Button>
        </DialogActions>
      </Dialog>
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
