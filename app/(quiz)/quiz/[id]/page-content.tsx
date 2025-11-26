"use client";

import { Box, CircularProgress, Fade, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import quizDataType from "@/lib/types/quizDataType";
import useSWR from "swr";
import QuizContent from "@/lib/components/quiz/QuizContent";

export default function PageContent({ quizId }: {
  quizId: string;
}) {
  const theme = useTheme();
  const { data, error, isLoading } = useSWR(`/quiz/${quizId}`);

  let quizData: quizDataType | undefined = undefined;
  if (data) {
    quizData = {
      quizId: data.quiz.id,
      quizName: data.quiz.title,
      questions: data.quiz.questions.map((q: any) => {
        return {
          questionId: q.id,
          description: q.description,
          options: [q.optA, q.optB, q.optC, q.optD],
          answer: q.answer
        };
      })
    };
  }

  return (
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
  );
}
