import React from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

const TypographyButton = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  '&:hover': {
    backgroundImage: "linear-gradient(to right, " + theme.palette.text.primary + " 100%, transparent 0%)",
    backgroundPosition: "0 1.1em",
    backgroundRepeat: "repeat-x",
    backgroundSize: "4px 4px",
  },
  '&:focus': {
    backgroundImage: "linear-gradient(to right, " + theme.palette.text.primary + " 100%, transparent 0%)",
    backgroundPosition: "0 1.1em",
    backgroundRepeat: "repeat-x",
    backgroundSize: "4px 4px",
  },
  '&:active': {
    backgroundImage: "linear-gradient(to right, " + theme.palette.primary.main + " 100%, transparent 0%)",
    backgroundPosition: "0 1.1em",
    backgroundRepeat: "repeat-x",
    backgroundSize: "4px 4px",
    color: theme.palette.primary.main,
  },
}));

export default TypographyButton;
