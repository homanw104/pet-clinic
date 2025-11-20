import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Fade, Skeleton, Stack, Typography } from "@mui/material";
import InfoCard from "@/components/atomic/InfoCard";
import ListButton from "@/components/button/ListButton";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useRenderState } from "@/lib/utils/hook";
import quizBriefType from "@/lib/types/quizBriefType";

export default function QuizList() {
  const router = useRouter();

  // Quiz list data
  const [quizList, setQuizList] = useState<quizBriefType[]>([]);

  // Raw data from backend
  const {
    data, error, isLoading
  } = useSWR<any>("/listPaper");

  // States to control loading & error UI
  const {
    renderState, setRenderState, clearTimeouts
  } = useRenderState();

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  useEffect(() => {
    // Check render dependencies in order to determine render state
    if (error) {
      setRenderState("error");
    } else if (isLoading) {
      setRenderState("loading");
    } else if (data) {
      setQuizList(data.map((quiz: any) => {
        return {
          quizId: quiz.paper_id,
          quizName: quiz.paper_name,
        }
      }));
      setRenderState("loaded");
    } else {
      setRenderState("error");
    }
    
    // Clear timeouts when unmount
    return () => clearTimeouts();
  }, [data, error, isLoading, clearTimeouts, setRenderState]);

  return (
    <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
      marginTop: "4rem",
      marginBottom: "4rem",
      minHeight: "600px",
    }}>
      <InfoCard>
        在下侧列表中选择试卷，开始综合测试！
      </InfoCard>

      <Fade in={renderState.error} unmountOnExit>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <WarningAmberIcon />
          <Typography variant="h6" paddingLeft="0.5rem">无法连接到网络</Typography>
        </Stack>
      </Fade>

      <Fade in={renderState.loading} style={{ transitionDelay: "250ms" }} unmountOnExit>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          <Skeleton variant="rounded" width="100%" height="40px" />
          <Skeleton variant="rounded" width="100%" height="40px" />
          <Skeleton variant="rounded" width="100%" height="40px" />
        </Stack>
      </Fade>

      <Fade in={renderState.loaded} unmountOnExit>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
          {quizList.map((quiz, index) => (
            <ListButton key={index} onClick={() => handleOnClick(`/quiz/${quiz.quizId}`)}>
              {quiz.quizName}
            </ListButton>
          ))}
        </Stack>
      </Fade>

    </Stack>
  )
}
