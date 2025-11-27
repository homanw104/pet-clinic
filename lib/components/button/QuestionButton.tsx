import { Button, ButtonProps, Typography, useTheme } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { hexToRGBA } from "@/lib/utils/color";

interface QuizButtonProps extends ButtonProps {
  state: "default" | "selected" | "correct" | "incorrect" | "final";
}

export default function QuestionButton({ children, state = "default", ...props }: QuizButtonProps) {
  const theme = useTheme();

  switch (state) {
    case "correct":
      return (
        <Button
          fullWidth disableElevation disableRipple disableFocusRipple
          variant="contained" color="success" {...props} sx={{
            cursor: "default", padding: "0.5rem 1rem", height: "3rem", border: "0.8px solid transparent"
          }}
        >
          <CheckIcon color="success" sx={{ position: "absolute", right: "-36px" }} />
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
    case "incorrect":
      return (
        <Button
          fullWidth disableElevation disableRipple disableFocusRipple
          variant="contained" color="error" {...props} sx={{
            cursor: "default", padding: "0.5rem 1rem", height: "3rem", border: "0.8px solid transparent"
          }}
        >
          <ClearIcon color="error" sx={{ position: "absolute", right: "-36px" }} />
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
    case "final":
      return (
        <Button
          fullWidth disableElevation disableRipple disableFocusRipple
          variant="outlined" color="primary" {...props} sx={{
            cursor: "default", padding: "0.5rem 1rem", height: "3rem"
          }}
        >
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
    case "selected":
      return (
        <Button
          fullWidth disableElevation variant="outlined" color="primary" {...props} sx={{
            cursor: "pointer", padding: "0.5rem 1rem", height: "3rem",
            "&:focus": { boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.primary.main, 0.3)}` },
            boxShadow: `0 0 0 4px ${hexToRGBA(theme.palette.primary.main, 0.3)}`,
            transition: "box-shadow 0.3s"
          }}
        >
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
    default:
      return (
        <Button
          fullWidth disableElevation variant="outlined" color="primary" {...props} sx={{
            cursor: "pointer", padding: "0.5rem 1rem", height: "3rem"
          }}
        >
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
  }
}
