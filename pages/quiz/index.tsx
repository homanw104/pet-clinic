/**
 * 测试主页，主页上有随机测试题生成。
 */

import React, { ReactElement, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import InfoCard from "@/components/atomic/InfoCard";
import ListButton from "@/components/button/ListButton";
import QuizButton from "@/components/button/QuizButton";
import AppGridLayout from "@/layouts/AppGridLayout";
import quizInfoType from "@/types/quiz_info";
import questionType from "@/types/question";

export default function Quiz() {
  const theme = useTheme();

  const [quizList, setQuizList] = useState<quizInfoType[]>([]);
  const [question, setQuestion] = useState<questionType>();

  const mockAns = "左手持刀柄刃侧尾端，右手握持针钳（持针器），成45°角夹住刀片孔上段背侧，左手握住刀柄，对准孔槽处向下用力，至刀片完全安装在刀柄上；拆卸时，左手持手术刀柄，右手握持持针器，夹住刀片孔尾端背侧，稍提起，顺刀柄槽往前推 。";

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

    // Fetch random question
    setQuestion({
      questionId: 55,
      description: "你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题？",
      options: ["错误答案甲", "错误答案丙", "正确答案", "错误答案乙"],
      answer: 2,
    });
  }, []);

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="quiz" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
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

          {question &&
            <Stack direction="column" alignItems="center">
              <Typography variant="h5" textAlign="center" margin="4rem" minWidth="300px" maxWidth="400px">
                Q: 你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题你这问的什么问题？
              </Typography>
              <Stack direction="column" alignItems="center" marginBottom="4rem" spacing={2} width="320px">
                {/*{question.options.map((option, index) => (*/}
                {/*  <QuizButton state="default" key={index}>{option}</QuizButton>*/}
                {/*))}*/}
                <QuizButton state="correct">{mockAns}</QuizButton>
                <QuizButton state="incorrect">{mockAns}</QuizButton>
                <QuizButton state="final">{mockAns}</QuizButton>
                <QuizButton state="default">{mockAns}</QuizButton>
              </Stack>
            </Stack>
          }

          {!question &&
            <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
              <CircularProgress />
            </Stack>
          }

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
