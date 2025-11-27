import React, { useState } from "react";
import { Alert, Box, Divider, Snackbar, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import QuizContentQuestions from "@/lib/components/quiz/QuizContentQuestions";
import TypographyButton from "@/lib/components/button/TypographyButton";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import EastIcon from "@mui/icons-material/East";
import quizDataType from "@/lib/types/quizDataType";

export default function QuizContent({ quizData }: {
  quizData: quizDataType;
}) {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  // When isFinished is true, the quiz is finished and the user can only reset the quiz
  const [isFinished, setIsFinished] = useState(false);

  // When isIncomplete is true, a warning is shown
  const [isIncomplete, setIsIncomplete] = useState(false);

  // List of selection numbers, the index of each selection corresponds to the index of each question
  const [selections, setSelections] = useState<number[]>([]);

  // Correct answers count
  const [correctCount, setCorrectCount] = useState(0);

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    if (selections.length !== quizData.questions.length) {
      setIsIncomplete(true);
    } else {
      let count = 0;
      for (let i = 0; i < quizData.questions.length; i++) {
        if (selections[i] === quizData.questions[i].answer) count++;
      }
      setCorrectCount(count);
      setIsFinished(true);
    }
  };

  const handleResetQuiz = () => {
    // Reset selections and isFinished state
    setSelections([]);
    setIsFinished(false);
  };

  const handleCloseWarning = () => {
    // Close warning
    setIsIncomplete(false);
  };

  return (
    <Stack direction="column" alignItems="stretch" justifyContent="flex-start" spacing={2}>
      <Typography variant={isSmScreen ? "h5" : "h4"} padding="0rem 2rem">
        {quizData.quizName}
      </Typography>

      <Divider />

      <QuizContentQuestions
        questions={quizData.questions}
        selections={selections}
        setSelections={setSelections}
        isFinished={isFinished}
      />

      <Divider />

      {!isFinished &&
        <Box display="flex" justifyContent="flex-end" padding="0rem 2rem">
          <TypographyButton variant="h6" onClick={() => handleSubmitQuiz()}>
            提交答案 <EastIcon sx={{
            fontSize: theme.typography.h5.fontSize,
            position: "relative",
            top: "0.15em",
          }} />
          </TypographyButton>
        </Box>
      }

      {isFinished &&
        <Box display="flex" justifyContent="space-between" padding="0rem 2rem">
          <Typography variant="h6">
            正确 {correctCount}/{quizData.questions.length}
          </Typography>
          <TypographyButton variant="h6" onClick={() => handleResetQuiz()}>
            重做试卷 <NorthWestIcon sx={{
            fontSize: theme.typography.h5.fontSize,
            position: "relative",
            top: "0.15em",
          }} />
          </TypographyButton>
        </Box>
      }

      <Snackbar open={isIncomplete} onClose={handleCloseWarning} autoHideDuration={6000} anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
        <Alert onClose={handleCloseWarning} severity="error" sx={{ width: "288px" }}>
          试卷未完成！
        </Alert>
      </Snackbar>
    </Stack>
  );
}
