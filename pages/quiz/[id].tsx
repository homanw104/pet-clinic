/**
 * 试卷测试页面，根据试卷 [id] 获取试卷信息。
 */

import useSWR from "swr";
import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress, Fade, Grid, Stack, Typography, useTheme } from "@mui/material";
import LoginButton from "@/components/header/LoginButton";
import Subheader from "@/components/header/Subheader";
import QuizList from "@/components/quiz/QuizList";
import QuizContent from "@/components/quiz/QuizContent";
import AppGridLayout from "@/lib/layouts/AppGridLayout";
import PageNotFound from "@/components/app/PageNotFound";
import ConfirmDialog from "@/components/atomic/ConfirmDialog";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useRenderState } from "@/lib/utils/hook";
import quizDataType from "@/lib/types/quizDataType";

export default function Quiz() {
  const theme = useTheme();
  const router = useRouter();

  // When isDialogActive is true, a warning is shown to ask use whether to discard their changes
  const [isDialogActive, setIsDialogActive] = useState(false);
  
  // Quiz data, formatted in quizDataType
  const [quizData, setQuizData] = useState<quizDataType>();

  // Router query data, available when router.isReady
  const { id } = router.query;

  // Raw data from backend
  const {
    data, error, isLoading
  } = useSWR<any>(router.isReady ? `/showPaperDetails/?paper_id=${id}` : null);

  // States to control loading & error UI
  const {
    renderState, setRenderState, clearTimeouts
  } = useRenderState();

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

  useEffect(() => {
    // Check render dependencies in order to determine render state
    if (!router.isReady) {
      setRenderState("loading");
    } else if (typeof id !== "string") {
      setRenderState("notFound");
    } else if (error) {
      setRenderState("error");
    } else if (isLoading) {
      setRenderState("loading");
    } else if (data) {
      if (data.error_num) {
        setQuizData(undefined);
      } else {
        setQuizData({
          quizId: id,
          quizName: data[0].paper_id__paper_name,
          questions: data.map((question: any) => {
            return {
              questionId: "",   // Not provided from backend
              description: question.question_id__description,
              options: [
                question.question_id__option__option1,
                question.question_id__option__option2,
                question.question_id__option__option3,
                question.question_id__option__option4,
              ],
              answer: question.question_id__answer,
            }
          }),
        });
      }
      setRenderState("loaded");
    } else {
      setRenderState("notFound");
    }

    // Clear timeouts when unmount
    return () => clearTimeouts();
  }, [router.isReady, id, data, error, isLoading, clearTimeouts, setRenderState]);

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

          <Fade in={renderState.loading} style={{ transitionDelay: "200ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="536px">
              <CircularProgress />
            </Stack>
          </Fade>

          <Fade in={renderState.error} unmountOnExit>
            <Stack direction="row" alignItems="center" justifyContent="center" height="536px">
              <WarningAmberIcon />
              <Typography variant="h6" paddingLeft="0.5rem">无法连接到网络</Typography>
            </Stack>
          </Fade>

          <Fade in={renderState.loaded} unmountOnExit>
            <Box>
              <QuizContent
                quizData={quizData ? quizData : { quizId: "", quizName: "该试卷无可用题目", questions: [] }}
              />
            </Box>
          </Fade>

        </Box>
      </Grid>

      <ConfirmDialog
        isActive={isDialogActive}
        title={"返回随机测试"}
        text={"确认后将清除当前测试进度并返回随机测试！"}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />
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
