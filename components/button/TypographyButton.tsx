import { Typography, TypographyProps, useTheme } from "@mui/material";
import { useAccessibleButton } from "@/lib/utils/accessibility";

export default function TypographyButton({ children, variant, onClick, sx, ...props }: TypographyProps) {
  const theme = useTheme();
  const { isButtonActive, ...a11yProps } = useAccessibleButton(onClick);

  // The backgroundSize property determines the underline width
  let backgroundSize: string;
  switch (variant) {
    case "h1":
      backgroundSize = "6px 6px";
      break;
    case "h2": case "h3":
      backgroundSize = "4px 4px";
      break;
    case "h4": case "h5": case "h6":
      backgroundSize = "2px 2px";
      break;
    default:
      backgroundSize = "1px 1px";
  }

  return (
    <Typography className="unselectable" variant={variant} onClick={onClick} {...a11yProps} {...props} sx={{
      // Expand sx argument from parent
      ...sx,

      // Looks lickable when hover
      cursor: "pointer",

      // Fixed font for Typography Button
      fontFamily: "Noto Sans SC",

      // Padding for background styled underline
      paddingBottom: "0.2em",

      // Force to use active styles when space or enter key is pressed
      ...(isButtonActive && {
        "&, &:hover, &:focus": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 100%)`,
          backgroundPosition: "0 1.15em",
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
          color: theme.palette.primary.main,
        }
      }),

      // Use corresponding css styles when using mouse
      ...(!isButtonActive && {
        "&:hover, &:focus": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.text.primary} 100%)`,
          backgroundPosition: "0 1.15em",
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
        },
        "&:active": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 100%)`,
          backgroundPosition: "0 1.15em",
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
          color: theme.palette.primary.main,
        }
      }),
    }}>
      {children}
    </Typography>
  )
};
