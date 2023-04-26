/**
 * 测试主页，主页上有随机测试题生成。
 */

import React, { ReactElement, useEffect, useState } from "react";
import { Box, CircularProgress, Fade, Grid, Stack, Typography, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import QuestionButton from "@/components/button/QuestionButton";
import QuizList from "@/components/quiz/QuizList";
import AppGridLayout from "@/layouts/AppGridLayout";
import questionDataType from "@/types/questionDataType";

export default function Quiz() {
  const theme = useTheme();

  // When isFinal is true, the quiz is finished and the user can only reset the quiz
  const [isFinal, setIsFinal] = useState(false);

  // Timeouts are set between setIsLoading and setIsLoaded to allow animations to play
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Selection data, `-1` for unselected
  const [selection, setSelection] = useState<number>(-1);

  // Question data
  const [question, setQuestion] = useState<questionDataType>();

  const handleRandomQuestion = () => {
    // Timeout reference
    let loadingTimeout: NodeJS.Timeout;
    let loadedTimeout: NodeJS.Timeout;

    // Set to loading state before fetching a new question
    setIsLoaded(false);
    loadingTimeout = setTimeout(() => { setIsLoading(true) }, 250);

    // Reset selection and remove results
    setSelection(-1);
    setIsFinal(false);

    // Simulate network delay
    setTimeout(() => {
      // Fetch random question from backend
      setQuestion({
        questionId: 55,
        description: "（样例数据）你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题？",
        options: ["错误答案甲", "错误答案丙", "正确答案", "错误答案乙"],
        answer: 2,
      });
      setIsLoading(false);
      clearTimeout(loadingTimeout);
      loadedTimeout = setTimeout(() => { setIsLoaded(true) }, 250);
    }, 1500);
  };

  const handleOnSelect = (index: number) => {
    // Ignore clicks when the quiz is final
    if (isFinal) return;

    // Save selection and set question as final
    setSelection(index);
    setIsFinal(true);
  };

  useEffect(() => {
    // Load a question when page mounts
    handleRandomQuestion();
  }, []);

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

      <Grid item xs={9} position="relative">
        <Box sx={{
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.onMain,
          marginTop: "4rem",
          marginBottom: "4rem",
          marginLeft: "2rem",
          borderRadius: "0.75rem",
          minHeight: "600px",
        }}>

          <Fade in={isLoaded} unmountOnExit>
            <Stack direction="column" alignItems="center">
              <Typography variant="h5" textAlign="center" margin="4rem" minWidth="300px" maxWidth="400px">
                Q: {question?.description}
              </Typography>
              <Stack direction="column" alignItems="center" marginBottom="4rem" spacing={2} width="320px">
                {question?.options.map((option, index) => {
                  let state: "default" | "selected" | "correct" | "incorrect" | "final";

                  if (isFinal) {
                    if (index === question?.answer) {
                      state = "correct";
                    } else if (index === selection) {
                      state = "incorrect";
                    } else {
                      state = "final";
                    }
                  } else {
                    state = "default";
                  }

                  return (
                    <QuestionButton state={state} key={index} onClick={
                      () => handleOnSelect(index)
                    }>
                      {option}
                    </QuestionButton>
                  )
                })}
              </Stack>
            </Stack>
          </Fade>

          <Fade in={isLoading} style={{ transitionDelay: "500ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="600px">
              <CircularProgress />
            </Stack>
          </Fade>

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
