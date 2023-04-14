import { Typography, TypographyProps, useTheme } from "@mui/material";

export default function TypographyButton({ children, ...props }: TypographyProps) {
  const theme = useTheme();

  return (
    <Typography className="unselectable" {...props} sx={{
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
      }
    }}>
      {children}
    </Typography>
  )
};
