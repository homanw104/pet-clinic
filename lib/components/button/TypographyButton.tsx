import { Typography, TypographyProps, useTheme } from "@mui/material";
import { useAccessibleButton } from "@/lib/utils/accessibility";

export default function TypographyButton({ children, variant, onClick, sx, ...props }: TypographyProps) {
  const theme = useTheme();
  const { isButtonActive, ...a11yProps } = useAccessibleButton(onClick);

  // The backgroundSize property determines the underline width
  let backgroundSize: string;
  let backgroundPosition: string;
  switch (variant) {
    case "h1":
      backgroundSize = "6px 6px";
      backgroundPosition = "0 1.15em";
      break;
    case "h2": case "h3":
      backgroundSize = "4px 4px";
      backgroundPosition = "0 1.15em";
      break;
    case "h4":
      backgroundSize = "3px 3px";
      backgroundPosition = "0 1.2em";
      break;
    case "h5":
      backgroundSize = "2px 2px";
      backgroundPosition = "0 1.25em";
      break;
    case "h6":
      backgroundSize = "2px 2px";
      backgroundPosition = "0 1.35em";
      break;
    default:
      backgroundSize = "1px 1px";
      backgroundPosition = "0 1.35em";
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
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          color: theme.palette.primary.main,
        }
      }),

      // Use corresponding css styles when using mouse
      ...(!isButtonActive && {
        "&:hover, &:focus": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.text.primary} 100%)`,
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
        },

        "&:active": {
          backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main} 100%)`,
          backgroundRepeat: "repeat-x",
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          color: theme.palette.primary.main,
        }
      }),
    }}>
      {children}
    </Typography>
  );
}
