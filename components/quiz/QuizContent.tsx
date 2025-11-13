import React, { useEffect, useState } from "react";
import { Alert, Divider, Snackbar, Stack, Typography, useTheme } from "@mui/material";
import QuestionList from "@/components/quiz/QuestionList";
import TypographyButton from "@/components/button/TypographyButton";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import EastIcon from "@mui/icons-material/East";
import quizDataType from "@/lib/types/quizDataType";

interface QuizContentProps {
  quizData: quizDataType;
}

export default function QuizContent({ quizData }: QuizContentProps) {
  const theme = useTheme();

  // When isFinal is true, the quiz is finished and the user can only reset the quiz
  const [isFinal, setIsFinal] = useState(false);

  // When isIncomplete is true, a warning is shown
  const [isIncomplete, setIsIncomplete] = useState(false);

  // List of selection numbers, the index of each selection corresponds to the index of each question
  const [selections, setSelections] = useState<number[]>([]);

  const handleFinalSubmit = () => {
    // Check if all questions are answered
    if (selections.length !== quizData.questions.length) {
      setIsIncomplete(true);
    } else {
      setIsFinal(true);
    }
  };

  const handleResetQuiz = () => {
    // Reset selections and isFinal state
    setSelections([]);
    setIsFinal(false);
  };

  const handleCloseWarning = () => {
    // Close warning
    setIsIncomplete(false);
  };

  useEffect(() => {
    // Reset quiz when quiz data change
    handleResetQuiz();
  }, [quizData]);

  return (
    <Stack direction="column" alignItems="stretch" justifyContent="flex-start" spacing={2}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between">
        <Typography variant="h4">{quizData.quizName}</Typography>

        {!isFinal &&
          <TypographyButton variant="h5" onClick={() => handleFinalSubmit()}>
            提交答案 <EastIcon sx={{
              fontSize: theme.typography.h5.fontSize,
              position: "relative",
              top: "0.15em",
            }} />
          </TypographyButton>
        }

        {isFinal &&
          <TypographyButton variant="h5" onClick={() => handleResetQuiz()}>
            重做试卷 <SouthWestIcon sx={{
              fontSize: theme.typography.h5.fontSize,
              position: "relative",
              top: "0.15em",
            }} />
          </TypographyButton>
        }
      </Stack>

      <Divider />

      <Snackbar open={isIncomplete} onClose={handleCloseWarning} autoHideDuration={6000} anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
        <Alert onClose={handleCloseWarning} severity="error" sx={{ width: "288px" }}>
          试卷未完成！
        </Alert>
      </Snackbar>

      <QuestionList
        questions={quizData.questions}
        selections={selections}
        setSelections={setSelections}
        isFinal={isFinal}
      />
    </Stack>
  )
}
