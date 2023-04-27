/**
 * 在线测试主页，主页上有随机测试题生成。
 */

import useSWR from "swr";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, CircularProgress, Fade, Grid, Stack, Typography, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import QuestionButton from "@/components/button/QuestionButton";
import QuizList from "@/components/quiz/QuizList";
import AppGridLayout from "@/layouts/AppGridLayout";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import questionDataType from "@/types/questionDataType";
import { useLoadingState } from "@/utils/hook_util";

// Configurations to disable auto revalidation and deduping interval for random question API
const swrConfig = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 0,
  focusThrottleInterval: 0,
}

export default function Quiz() {
  const theme = useTheme();

  // When isFinal is true, the quiz is finished and the user can only reset the quiz
  const [isFinal, setIsFinal] = useState(false);

  // Selection data, `-1` for unselected
  const [selection, setSelection] = useState(-1);

  // Question data, formatted in questionDataType
  const [question, setQuestion] = useState<questionDataType>();

  // Raw data from backend
  const { data, error, isLoading, mutate } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URL}/randomQuestion/`, swrConfig);

  // States to control loading & error UI
  const {
    showLoading, showError, showLoaded,
    setShowLoading, setShowError, setShowLoaded, clearTimeouts
  } = useLoadingState();

  const handleOnSelect = (index: number) => {
    // Ignore clicks when the quiz is final
    if (isFinal) return;

    // Save selection and set question as final
    setSelection(index);
    setIsFinal(true);
  };

  const handleRandomQuestion = async () => {
    // Set UI to loading before fetching a new question
    setShowLoading();

    // Reset selection and remove results
    setSelection(-1);
    setIsFinal(false);

    // Fetch a new question after a timeout (for animation) using mutate()
    setTimeout(() => {
      mutate().then(() => {
        if (error) {
          setShowError();
        } else {
          setShowLoaded();
        }
      });
    }, 250);
  };

  // Handle data states change
  useEffect(() => {
    if (error) {
      setShowError();
    } else if (isLoading) {
      setShowLoading();
    } else if (data) {
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
      setShowLoaded();
    } else {
      setShowError();
    }
    
    return () => {
      clearTimeouts();
    }
  }, [data, error, isLoading, setShowError, setShowLoaded, setShowLoading, clearTimeouts]);

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
