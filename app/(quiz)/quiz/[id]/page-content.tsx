'use client';

import { Box, CircularProgress, Fade, Grid, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import quizDataType from "@/lib/types/quizDataType";
import useSWR from "swr";
import LoginButton from "@/lib/components/home/LoginButton";
import QuizList from "@/lib/components/quiz/QuizList";
import QuizContent from "@/lib/components/quiz/QuizContent";
import ConfirmDialog from "@/lib/components/atomic/ConfirmDialog";
import TitleButton from "@/lib/components/home/TitleButton";
import TypographyButton from "@/lib/components/button/TypographyButton";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";
import QuizListChips from "@/lib/components/quiz/QuizListChips";
import { resetError } from "@/lib/store/errorSlice";
import ErrorDialog from "@/lib/components/atomic/ErrorDialog";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import Footer from "@/lib/components/home/Footer";

export default function PageContent({ quizId }: {
  quizId: string;
}) {
  const theme = useTheme();
  const router = useRouter();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data, error, isLoading } = useSWR<any>(`/quiz/${quizId}`);

  const dispatch = useAppDispatch();
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  const [isDiscardDialogActive, setIsDiscardDialogActive] = useState(false);

  let quizData: quizDataType | undefined = undefined;
  if (data) {
    quizData = {
      quizId: data.quiz.id,
      quizName: data.quiz.title,
      questions: data.quiz.questions.map((q: any) => { return {
        questionId: q.id,
        description: q.description,
        options: [q.optA, q.optB, q.optC, q.optD],
        answer: q.answer
      }})
    };
  }

  const handleDialogCancel = () => {
    setIsDiscardDialogActive(false);
  };

  const handleDialogConfirm = () => {
    setIsDiscardDialogActive(false);
    router.push("/quiz");
  };

  return (
    <Grid container spacing="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem",
          marginBottom: { xs: "0rem", sm: "2rem" }
        }}>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <TitleButton />
            <LoginButton variant={isSmScreen ? "h4" : "h3"} sx={{ display: { xs: "none", sm: "block" }}} />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
            <Typography className="unselectable" variant={isXsScreen ? "h5" : isSmScreen ? "h4" : "h3"}>
              在线测试
            </Typography>
            <Stack spacing={isSmScreen ? 2 : 4} direction="row" justifyContent="flex-end" alignItems="baseline">
              <TypographyButton variant={isSmScreen ? "h5" : "h4"}
                                onClick={() => router.push("/")} sx={{display: { xs: "none", sm: "block" }}}>
                <WestOutlinedIcon sx={{
                  fontSize: {
                    sm: theme.typography.h5.fontSize,
                    md: theme.typography.h4.fontSize
                  },
                  position: "relative",
                  top: "0.2em",
                }} /> 返回导览
              </TypographyButton>
              <TypographyButton variant={isSmScreen ? "h5" : "h4"}
                                onClick={() => setIsDiscardDialogActive(true)} sx={{display: { xs: "none", sm: "block" }}}>
                <LoopSharpIcon sx={{
                  fontSize: {
                    sm: theme.typography.h5.fontSize,
                    md: theme.typography.h4.fontSize
                  },
                  transform: "rotate(-45deg)",
                  position: "relative",
                  top: "0.15em",
                }} /> 随机测试
              </TypographyButton>
            </Stack>
            <LoginButton variant="h5" sx={{ display: { xs: "block", sm: "none" }}} />
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={5} md={4} lg={3}>
        <QuizList sx={{display: { xs: "none", sm: "block" }}} />
        <QuizListChips sx={{display: { xs: "block", sm: "none" }}} />
      </Grid>

      <Grid item xs={12} sm={7} md={8} lg={9}>
        <Box sx={{
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.onMain,
          borderRadius: "1rem",
          minHeight: "36rem"
        }}>
          {isLoading &&
            <Fade in={isLoading} style={{ transitionDelay: "200ms" }} unmountOnExit>
              <Stack direction="column" alignItems="center" justifyContent="center" height="36rem">
                <CircularProgress />
              </Stack>
            </Fade>
          }

          {!isLoading && quizData &&
            <Fade in={Boolean(quizData)} unmountOnExit>
              <Box padding="2rem">
                <QuizContent
                  quizData={quizData}
                />
              </Box>
            </Fade>
          }

          {!isLoading && error &&
            <Fade in={error} unmountOnExit>
              <Stack direction="row" alignItems="center" justifyContent="center" height="36rem">
                <Typography variant="h6" paddingLeft="0.5rem">加载失败！</Typography>
              </Stack>
            </Fade>
          }
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>

      <ConfirmDialog
        isActive={isDiscardDialogActive}
        title={"返回随机测试"}
        text={"确认后将清除当前测试进度并返回随机测试！"}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />
    </Grid>
  )
}
