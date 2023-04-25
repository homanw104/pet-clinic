import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Stack } from "@mui/material";
import InfoCard from "@/components/atomic/InfoCard";
import ListButton from "@/components/button/ListButton";
import quizBriefType from "@/types/quizBriefType";

export default function QuizList() {
  const [quizList, setQuizList] = useState<quizBriefType[]>([]);

  useEffect(() => {
    // Fetch quiz list
    setQuizList([
      {
        quizId: 1,
        quizName: "综合测试1",
      },
      {
        quizId: 2,
        quizName: "综合测试2",
      },
      {
        quizId: 3,
        quizName: "综合测试3",
      },
    ]);
  }, []);

  return (
    <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
      marginTop: "4rem",
      marginBottom: "4rem",
      minHeight: "600px",
    }}>
      <InfoCard>
        在下侧列表中选择试卷，开始综合测试！
      </InfoCard>

      {quizList.length !== 0 && quizList.map((quiz, index) => (
        <ListButton key={index}>
          {quiz.quizName}
        </ListButton>
      ))}

      {quizList.length === 0 &&
        <Box width="100%">
          <LinearProgress sx={{ borderRadius: 5}} />
        </Box>
      }

    </Stack>
  )
}
