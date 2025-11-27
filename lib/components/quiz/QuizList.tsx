import useSWR from "swr";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Fade, Skeleton, Stack } from "@mui/material";
import InfoCard from "@/lib/components/atomic/InfoCard";
import ListButton from "@/lib/components/button/ListButton";
import quizBriefType from "@/lib/types/quizBriefType";
import ConfirmDialog from "@/lib/components/atomic/ConfirmDialog";

export default function QuizList({ sx, ...props }: {
  sx?: object;
}) {
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/quiz");

  const [discardDialogQuizId, setDiscardDialogQuizId] = useState<string | null>(null);
  const [isDiscardDialogActive, setIsDiscardDialogActive] = useState(false);

  const handleDialogCancel = () => {
    setIsDiscardDialogActive(false);
  };

  const handleDialogConfirm = () => {
    setIsDiscardDialogActive(false);
    router.push(`/quiz/${discardDialogQuizId}`);
  };

  type backendQuizType = {
    id: string;
    name: string;
  }

  let quizList: quizBriefType[] | undefined = undefined;
  if (data) {
    quizList = data.quizzes?.map((quiz: backendQuizType) => {
      return {
        quizId: quiz.id,
        quizName: quiz.name,
      };
    });
  }

  return (
    <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" {...props} sx={{ ...sx, minHeight: "36rem" }}>
      <ConfirmDialog
        isActive={isDiscardDialogActive}
        title={"确认开始测试"}
        text={"确认后将加载所选测试并清除当前测试进度！"}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />

      <InfoCard>
        在下侧列表中选择试卷，开始综合测试！
      </InfoCard>

      {isLoading &&
        <Fade in={isLoading} style={{ transitionDelay: "250ms" }} unmountOnExit>
          <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
          </Stack>
        </Fade>
      }

      {!isLoading && quizList &&
        <Fade in={Boolean(quizList)} unmountOnExit>
          <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
            {quizList.map((quiz, index) => (
              <ListButton key={index} onClick={() => {
                setDiscardDialogQuizId(quiz.quizId);
                setIsDiscardDialogActive(true);
              }}>
                {quiz.quizName}
              </ListButton>
            ))}
          </Stack>
        </Fade>
      }

      {!isLoading && error &&
        // Display nothing on error
        <></>
      }
    </Stack>
  );
}
