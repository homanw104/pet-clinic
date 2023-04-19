import { Typography, TypographyProps, useTheme } from "@mui/material";

export default function TypographyButton({ children, variant, ...props }: TypographyProps) {
  const theme = useTheme();

  // The backgroundSize property determines the underline width
  let backgroundSize: string;
  switch (variant) {
    case "h1": case "h2": case "h3":
      backgroundSize = "4px 4px";
      break;
    case "h4": case "h5": case "h6":
      backgroundSize = "2px 2px";
      break;
    default:
      backgroundSize = "1px 1px";
  }

  return (
    <Typography className="unselectable" variant={variant} {...props} sx={{
      cursor: "pointer",
      '&:hover': {
        backgroundImage: "linear-gradient(to right, " + theme.palette.text.primary + " 100%, transparent 0%)",
        backgroundPosition: "0 1.12em",
        backgroundRepeat: "repeat-x",
        backgroundSize: backgroundSize,
      },
      '&:focus': {
        backgroundImage: "linear-gradient(to right, " + theme.palette.text.primary + " 100%, transparent 0%)",
        backgroundPosition: "0 1.12em",
        backgroundRepeat: "repeat-x",
        backgroundSize: backgroundSize,
      },
      '&:active': {
        backgroundImage: "linear-gradient(to right, " + theme.palette.primary.main + " 100%, transparent 0%)",
        backgroundPosition: "0 1.12em",
        backgroundRepeat: "repeat-x",
        backgroundSize: backgroundSize,
        color: theme.palette.primary.main,
      }
    }}>
      {children}
    </Typography>
  )
};
