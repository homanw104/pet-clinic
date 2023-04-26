/**
 * 在线测试主页，主页上有随机测试题生成。
 */

import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, Fade, Grid, Stack, Typography, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import QuestionButton from "@/components/button/QuestionButton";
import QuizList from "@/components/quiz/QuizList";
import AppGridLayout from "@/layouts/AppGridLayout";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import questionDataType from "@/types/questionDataType";
import useSWR from "swr";

export default function Quiz() {
  const theme = useTheme();

  // When isFinal is true, the quiz is finished and the user can only reset the quiz
  const [isFinal, setIsFinal] = useState(false);

  // Whether to show error indicator
  const [showError, setShowError] = useState(true);

  // Whether to show loading indicator
  const [showLoading, setShowLoading] = useState(true);

  // Whether to show content
  const [showLoaded, setShowLoaded] = useState(false);

  // Selection data, `-1` for unselected
  const [selection, setSelection] = useState(-1);

  // Question data, formatted in questionDataType
  const [question, setQuestion] = useState<questionDataType>();

  // Raw data from backend
  const { data, error, isLoading, mutate } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URL}/randomQuestion/`);

  // Timeout references, timeouts are set to allow animations play
  const errorTimeout = useRef<NodeJS.Timeout>();
  const loadingTimeout = useRef<NodeJS.Timeout>();
  const loadedTimeout = useRef<NodeJS.Timeout>();

  const handleRandomQuestion = async () => {
    // Set UI to loading before fetching a new question
    clearTimeout(errorTimeout.current); setShowError(false);
    clearTimeout(loadedTimeout.current); setShowLoaded(false);
    loadingTimeout.current = setTimeout(() => { setShowLoading(true) }, 250);

    // Reset selection and remove results
    setSelection(-1);
    setIsFinal(false);

    // Fetch a new question by triggering a revalidation for the data
    setTimeout(() => {
      mutate().then(() => {
        if (error) {
          clearTimeout(loadedTimeout.current); setShowLoaded(false);
          clearTimeout(loadingTimeout.current); setShowLoading(false);
          errorTimeout.current = setTimeout(() => { setShowError(true) }, 250);
        } else {
          clearTimeout(errorTimeout.current); setShowError(false);
          clearTimeout(loadingTimeout.current); setShowLoading(false);
          loadedTimeout.current = setTimeout(() => { setShowLoaded(true) }, 250);
        }
      });
    }, 250);
  };

  const handleOnSelect = (index: number) => {
    // Ignore clicks when the quiz is final
    if (isFinal) return;

    // Save selection and set question as final
    setSelection(index);
    setIsFinal(true);
  };

  useEffect(() => {
    if (error) {
      // Set UI to error
      clearTimeout(loadedTimeout.current); setShowLoaded(false);
      clearTimeout(loadingTimeout.current); setShowLoading(false);
      errorTimeout.current = setTimeout(() => { setShowError(true) }, 250);
    } else if (isLoading) {
      // Set UI to loading
      clearTimeout(errorTimeout.current); setShowError(false);
      clearTimeout(loadedTimeout.current); setShowLoaded(false);
      loadingTimeout.current = setTimeout(() => { setShowLoading(true) }, 250);
    } else if (data) {
      // Set question and set UI to loaded
      setQuestion({
        questionId: data[0].question_id,
        description: data[0].description,
        options: [
          data[0].option__option1,
          data[0].option__option2,
          data[0].option__option3,
          data[0].option__option4,
        ],
        answer: data[0].answer,
      });
      clearTimeout(errorTimeout.current); setShowError(false);
      clearTimeout(loadingTimeout.current); setShowLoading(false);
      loadedTimeout.current = setTimeout(() => { setShowLoaded(true) }, 250);
    } else {
      // Handle undefined data
      console.log(data);
    }

    // Clear timeouts on unmount
    return () => {
      clearTimeout(errorTimeout.current);
      clearTimeout(loadingTimeout.current);
      clearTimeout(loadedTimeout.current);
    }
  }, [data, error, isLoading]);

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

          <Fade in={showError} unmountOnExit>
            <Stack direction="row" alignItems="center" justifyContent="center" height="600px">
              <WarningAmberIcon />
              <Typography variant="h6" paddingLeft="0.5rem">无法连接到网络</Typography>
            </Stack>
          </Fade>

          <Fade in={showLoading} style={{ transitionDelay: "200ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="600px">
              <CircularProgress />
            </Stack>
          </Fade>

          <Fade in={showLoaded} unmountOnExit>
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
