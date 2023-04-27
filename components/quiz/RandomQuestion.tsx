import React from "react";
import { Stack, Typography } from "@mui/material";
import QuestionButton from "@/components/button/QuestionButton";
import questionDataType from "@/types/questionDataType";

interface Props {
  question: questionDataType;
  isFinal: boolean;
  selection: number;
  onSelect: (index: number) => void;
}

export default function RandomQuestion({ question, isFinal, selection, onSelect }: Props) {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h5" textAlign="center" margin="4rem" minWidth="300px" maxWidth="400px">
        Q: {question?.description}
      </Typography>
      <Stack direction="column" alignItems="center" marginBottom="4rem" spacing={2} width="320px">
        {question?.options.map((option, index) => {
          let state: "default" | "selected" | "correct" | "incorrect" | "final";

          if (isFinal) {
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
            <QuestionButton state={state} key={index} onClick={
              () => onSelect(index)
            }>
              {option}
            </QuestionButton>
          )
        })}
      </Stack>
    </Stack>
  )
}
