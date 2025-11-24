import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import QuestionButton from "@/components/button/QuestionButton";
import questionDataType from "@/lib/types/questionDataType";

export default function RandomQuestion({ question }: {
  question?: questionDataType;
}) {
  const [currentQuestion, setCurrentQuestion] = useState(question);
  const [selection, setSelection] = useState(-1);

  const handleOnClick = (index: number) => {
    if (selection === -1) {
      setSelection(index);
    }
  };

  if (currentQuestion !== question) {
    setCurrentQuestion(question);
    setSelection(-1);
  }

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h5" textAlign="center" margin="4rem" minWidth="300px" maxWidth="400px">
        Q: {question?.description}
      </Typography>
      <Stack direction="column" alignItems="center" spacing={2} width="320px">
        {question?.options.map((option, index) => {
          let state: "default" | "selected" | "correct" | "incorrect" | "final";

          if (selection !== -1) {
            if (index === question?.answer) {
              state = "correct";
            } else if (index === selection) {
              state = "incorrect";
            } else {
              state = "final";
            }
          } else {
            state = "default";
          }

          return (
            <QuestionButton state={state} key={index} onClick={() => handleOnClick(index)}>
              {option}
            </QuestionButton>
          )
        })}
      </Stack>
    </Stack>
  )
}
