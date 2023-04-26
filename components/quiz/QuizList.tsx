import React, { useEffect, useState } from "react";
import { Fade, Skeleton, Stack } from "@mui/material";
import InfoCard from "@/components/atomic/InfoCard";
import ListButton from "@/components/button/ListButton";
import quizBriefType from "@/types/quizBriefType";
import { useRouter } from "next/router";

export default function QuizList() {
  const router = useRouter();

  // Timeouts are set between setIsLoading and setIsLoaded to allow animations to play
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Quiz list data
  const [quizList, setQuizList] = useState<quizBriefType[]>([]);

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  useEffect(() => {
    // Timeout reference
    let loadingTimeout: NodeJS.Timeout;
    let loadedTimeout: NodeJS.Timeout;

    // Set to loading state before fetching a new question
    setIsLoaded(false);
    loadingTimeout = setTimeout(() => { setIsLoading(true) }, 250);

    // Simulate network delay
    setTimeout(() => {
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
      setIsLoading(false);
      clearTimeout(loadingTimeout);
      loadedTimeout = setTimeout(() => { setIsLoaded(true) }, 250);
    }, 1500);

    // Clear timeouts when unmount
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(loadedTimeout);
    }
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

      <Fade in={isLoaded} unmountOnExit>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          {quizList.map((quiz, index) => (
            <ListButton key={index} onClick={() => handleOnClick(`/quiz/${quiz.quizId}`)}>
              {quiz.quizName}
            </ListButton>
          ))}
        </Stack>
      </Fade>

      <Fade in={isLoading} style={{ transitionDelay: "250ms" }} unmountOnExit>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          <Skeleton variant="rounded" width="100%" height="40px" />
          <Skeleton variant="rounded" width="100%" height="40px" />
          <Skeleton variant="rounded" width="100%" height="40px" />
        </Stack>
      </Fade>

    </Stack>
  )
}
