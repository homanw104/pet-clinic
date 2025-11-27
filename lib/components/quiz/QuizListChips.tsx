import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Chip, Fade, Skeleton, Stack } from "@mui/material";
import useSWR from "swr";
import quizBriefType from "@/lib/types/quizBriefType";
import ConfirmDialog from "@/lib/components/atomic/ConfirmDialog";

export default function QuizListChips({ sx, ...props }: {
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
    <Box sx={{ overflowX: "auto", ...sx }} {...props}>
      <ConfirmDialog
        isActive={isDiscardDialogActive}
        title={"返回随机测试"}
        text={"确认后将清除当前测试进度并返回随机测试！"}
        onCancel={handleDialogCancel}
        onConfirm={handleDialogConfirm}
      />

      {isLoading &&
        <Fade in>
          <Stack direction="row" spacing="1rem">
            <Skeleton variant="rounded" width="8rem" height="2rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="7rem" height="2rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="6rem" height="2rem" sx={{ borderRadius: "1rem" }} />
          </Stack>
        </Fade>
      }

      {!isLoading && quizList &&
        <Fade in={Boolean(quizList)}>
          <Stack direction="row" spacing="0.5rem">
            {quizList.map((quiz, index) => (
              <Chip
                label={quiz.quizName} key={index}
                onClick={() => {
                  setDiscardDialogQuizId(quiz.quizId);
                  setIsDiscardDialogActive(true);
                }}
              />
            ))}
          </Stack>
        </Fade>
      }

      {!isLoading && error &&
        // Display nothing on error
        <></>
      }
    </Box>
  );
}
