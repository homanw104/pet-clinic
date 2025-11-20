/**
 * 在线测试主页，主页上有随机测试题生成。
 */

import useSWR from "swr";
import React, { ReactElement, useEffect, useState } from "react";
import { Box, CircularProgress, Fade, Grid, Stack, Typography, useTheme } from "@mui/material";
import LoginButton from "@/components/home/LoginButton";
import Subheader from "@/components/home/Subheader";
import QuizList from "@/components/quiz/QuizList";
import RandomQuestion from "@/components/quiz/RandomQuestion";
import AppGridLayout from "@/lib/layouts/AppGridLayout";
import PageNotFound from "@/components/app/PageNotFound";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useRenderState } from "@/lib/utils/hook";
import questionDataType from "@/lib/types/questionDataType";

export default function Quiz() {
  const theme = useTheme();

  // When isFinal is true, the quiz is finished and the user can only reset the quiz
  const [isFinal, setIsFinal] = useState(false);

  // Selection data, `-1` for unselected
  const [selection, setSelection] = useState(-1);

  // Question data, formatted in questionDataType
  const [question, setQuestion] = useState<questionDataType>();

  // Raw data from backend
  const {
    data, error, isLoading, mutate
  } = useSWR<any>("/randomQuestion");

  // States to control loading & error UI
  const {
    renderState, setRenderState, clearTimeouts
  } = useRenderState();

  const handleOnSelect = (index: number) => {
    // Ignore clicks when the quiz is final
    if (isFinal) return;

    // Save selection and set question as final
    setSelection(index);
    setIsFinal(true);
  };

  const handleRandomQuestion = () => {
    // Set UI to loading before fetching a new question
    setRenderState("loading");

    // Reset selection and remove results
    setSelection(-1);
    setIsFinal(false);

    // Fetch a new question after a timeout (for animation) using mutate()
    setTimeout(async () => {
      let prevId: string;
      let newId: string;
      let newData: any;

      // Fetch new questions until the question id is different
      do {
        prevId = data ? data[0].question_id : "";
        newData = await mutate();
        newId = newData ? newData[0].question_id : "";
      } while (prevId === newId);
    }, 250);
  };

  useEffect(() => {
    // Handle data states change
    if (error) {
      setRenderState("error");
    } else if (isLoading) {
      setRenderState("loading");
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
      setRenderState("loaded");
    } else {
      setRenderState("error");
    }

    // Clear timeouts when unmount
    return () => clearTimeouts();
  }, [data, error, isLoading, clearTimeouts, setRenderState]);

  if (renderState.notFound) return <PageNotFound />;

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <LoginButton />
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

          <Fade in={renderState.loading} style={{ transitionDelay: "200ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="600px">
              <CircularProgress />
            </Stack>
          </Fade>

          <Fade in={renderState.error} unmountOnExit>
            <Stack direction="row" alignItems="center" justifyContent="center" height="600px">
              <WarningAmberIcon />
              <Typography variant="h6" paddingLeft="0.5rem">无法连接到网络</Typography>
            </Stack>
          </Fade>

          <Fade in={renderState.loaded} unmountOnExit>
            <Box>
              <RandomQuestion
                question={question ? question : { questionId: "", description: "该题不可用", options: [], answer: -1 }}
                isFinal={isFinal}
                selection={selection}
                onSelect={handleOnSelect}
              />
            </Box>
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
