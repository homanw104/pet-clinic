"use client";

import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { Box, CircularProgress, Fade, Stack, Typography, useTheme } from "@mui/material";
import RandomQuestion from "@/lib/components/quiz/RandomQuestion";
import questionDataType from "@/lib/types/questionDataType";
import { RandomQuizContext } from "@/lib/components/context/RandomQuizContext";

export default function PageContent() {
  const theme = useTheme();
  const { refreshTimestamp } = useContext(RandomQuizContext);

  const [questionId, setQuestionId] = useState<string | null>(null);
  const [lastQuestionId, setLastQuestionId] = useState<string | null>(null);
  const { data: questionIdsData, error: questionIdsError, isLoading: questionIdsLoading } = useSWR("/question");
  const { data: questionData, error: questionError, isLoading: questionLoading }
    = useSWR(() => (questionId ? `/question/${questionId}` : null));

  const isLoading = questionLoading || questionIdsLoading;
  const error = questionError || questionIdsError;

  const ids: string[] = questionIdsData?.question_ids || [];

  // Set a random question id once the id list is populated and the question id is not set
  if (questionIdsData && !questionId) {
    let index = 0;
    do {
      // eslint-disable-next-line react-hooks/purity
      index = Math.floor(Math.random() * ids.length);
    } while (ids.length > 1 && ids[index] === lastQuestionId);
    setQuestionId(ids[index]);  // Will be set to null on refresh
    setLastQuestionId(ids[index]);  // Won't be set to null
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
    };
  }

  // Reset question when context signals a refresh via refreshTimestamp change
  useEffect(() => {
    setQuestionId(null);
  }, [refreshTimestamp]);

  return (
    <Box sx={{
      backgroundColor: theme.palette.surface.main,
      color: theme.palette.surface.onMain,
      borderRadius: "1rem",
      minHeight: "36rem"
    }}>
      {isLoading &&
        <Fade in={isLoading} style={{ transitionDelay: "200ms" }}>
          <Stack direction="column" alignItems="center" justifyContent="center" height="36rem">
            <CircularProgress />
          </Stack>
        </Fade>
      }

      {!isLoading && question &&
        <Fade in={Boolean(question)}>
          <Box>
            <RandomQuestion question={question} />
          </Box>
        </Fade>
      }

      {!isLoading && error &&
        <Fade in={error}>
          <Stack direction="row" alignItems="center" justifyContent="center" height="600px">
            <Typography variant="h6" paddingLeft="0.5rem">加载失败！</Typography>
          </Stack>
        </Fade>
      }
    </Box>
  );
}
