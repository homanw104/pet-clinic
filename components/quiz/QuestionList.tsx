import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import QuestionButton from "@/components/button/QuestionButton";
import questionDataType from "@/types/questionDataType";

interface ListProps {
  questions: questionDataType[];
  selections: number[];
  setSelections: React.Dispatch<React.SetStateAction<number[]>>;
  isFinal: boolean;   // When isFinal, answers are revealed and buttons are disabled
}

export default function QuestionList({ questions, selections, setSelections, isFinal }: ListProps) {
  const handleOnClick = (questionIndex: number, optionIndex: number) => {
    // Ignore clicks when the quiz is final
    if (isFinal) return;

    // Save selection number
    setSelections((prev) => {
      let newSelections = [...prev];
      newSelections[questionIndex] = optionIndex;
      return newSelections;
    });
  };

  return (
    <Stack direction="column">

      {questions.map((question, questionIndex) => (
        <Stack direction="row" key={questionIndex} >
          <Box sx={{
            width: "2.5rem",
            minWidth: "2.5rem",
            paddingLeft: "0.5rem"
          }}>
            <Typography>{`${questionIndex+1}.`}</Typography>
          </Box>
          <Stack direction="column" flexGrow="1">
            <Typography>{question.description}</Typography>
            <Grid container maxWidth="752px" columns={2} spacing={2} sx={{
              paddingTop: "1rem",
              paddingBottom: "1rem",
            }}>

              {question.options.map((option, optionIndex) => {
                let state: "default" | "selected" | "correct" | "incorrect" | "final";
                let answer = question.answer;
                let selection = selections[questionIndex];

                if (isFinal) {
                  if (optionIndex === answer) {
                    state = "correct";
                  } else if (optionIndex === selection) {
                    state = "incorrect";
                  } else {
                    state = "final";
                  }
                } else {
                  if (selections[questionIndex] === optionIndex) {
                    state = "selected";
                  } else {
                    state = "default";
                  }
                }

                return (
                  <Grid item xs={2} sm={2} md={1} key={optionIndex} sx={{
                    paddingRight: "48px",
                  }}>
                    <QuestionButton state={state} onClick={
                      () => handleOnClick(questionIndex, optionIndex)
                    }>
                      {option}
                    </QuestionButton>
                  </Grid>
                )
              })}

            </Grid>
          </Stack>
        </Stack>
      ))}

    </Stack>
  )
}
