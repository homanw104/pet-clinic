'use client';

import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import LoopSharpIcon from "@mui/icons-material/LoopSharp";
import {
  Box, CircularProgress,
  Fade,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { resetError } from "@/lib/store/errorSlice";
import ErrorDialog from "@/lib/components/atomic/ErrorDialog";
import TitleButton from "@/lib/components/home/TitleButton";
import LoginButton from "@/lib/components/home/LoginButton";
import TypographyButton from "@/lib/components/button/TypographyButton";
import RandomQuestion from "@/lib/components/quiz/RandomQuestion";
import QuizList from "@/lib/components/quiz/QuizList";
import QuizListChips from "@/lib/components/quiz/QuizListChips";
import Footer from "@/lib/components/home/Footer";
import questionDataType from "@/lib/types/questionDataType";

export default function PageContent() {
  const theme = useTheme();
  const router = useRouter();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  // Question fetching and handling
  const [questionId, setQuestionId] = useState(null);
  const { data: questionIdsData, error: questionIdsError, isLoading: questionIdsLoading } = useSWR("/question");
  const { data: questionData, error: questionError, isLoading: questionLoading, mutate: questionMutate }
    = useSWR(() => (questionId ? `/question/${questionId}` : null));

  const handleRefreshQuestion = () => {
    if (questionIdsData) {
      const ids = questionIdsData.question_ids;
      let index = 0;
      do { index = Math.floor(Math.random() * ids.length) } while (ids.length > 1 && ids[index] === questionId);
      setQuestionId(ids[index]);
      questionMutate().then();
    }
  };

  // Set a random question id once the id list is populated
  if (questionIdsData && questionId === null) {
    const ids = questionIdsData.question_ids;
    let index = 0;
    // eslint-disable-next-line react-hooks/purity
    do { index = Math.floor(Math.random() * ids.length) } while (ids.length > 1 && ids[index] === questionId);
    setQuestionId(ids[index]);
  }

  // Populate question when data is available
  let question: questionDataType | undefined = undefined;
  if (questionData) {
    question = {
      questionId: questionData?.question._id,
      description: questionData?.question.description,
      options: [
        questionData?.question.optA,
        questionData?.question.optB,
        questionData?.question.optC,
        questionData?.question.optD
      ],
      answer: questionData?.question.answer
    }
  }

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
                                onClick={handleRefreshQuestion} sx={{display: { xs: "none", sm: "block" }}}>
                <LoopSharpIcon sx={{
                  fontSize: {
                    sm: theme.typography.h5.fontSize,
                    md: theme.typography.h4.fontSize
                  },
                  transform: "rotate(-45deg)",
                  position: "relative",
                  top: "0.15em",
                }} /> 随机下一题
              </TypographyButton>
            </Stack>
            <LoginButton variant="h5" sx={{ display: { xs: "block", sm: "none" }}} />
          </Stack>
          <Stack spacing={2} direction="row" justifyContent="flex-end" alignItems="baseline"
                 sx={{ display: { xs: "inline-flex", sm: "none" }}}>
            <TypographyButton variant="h5" noWrap={true} onClick={ () => router.push("/") }>
              <WestOutlinedIcon sx={{ fontSize: theme.typography.h5.fontSize, position: "relative", top: "0.2em" }} /> 返回导览
            </TypographyButton>
            <TypographyButton variant="h5" noWrap={true} onClick={handleRefreshQuestion}>
              <LoopSharpIcon sx={{ fontSize: theme.typography.h5.fontSize, transform: "rotate(-45deg)", position: "relative", top: "0.15em" }} /> 随机下一题
            </TypographyButton>
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
          height: "36rem",
        }}>

          <Fade in={questionLoading || questionIdsLoading} style={{ transitionDelay: "200ms" }} unmountOnExit>
            <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          </Fade>

          <Fade in={questionError || questionIdsError} unmountOnExit>
            <Stack direction="row" alignItems="center" justifyContent="center" height="600px">
              <Typography variant="h6" paddingLeft="0.5rem">无法连接到网络</Typography>
            </Stack>
          </Fade>

          <Fade in={!questionLoading && !questionIdsLoading} unmountOnExit>
            <Box>
              <RandomQuestion question={question} />
            </Box>
          </Fade>

        </Box>
      </Grid>

      <Grid item xs={12}>
        <Footer />
      </Grid>
    </Grid>
  );
}
