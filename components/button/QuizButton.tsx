import { Button, ButtonProps, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface QuizButtonProps extends ButtonProps {
  state: "default" | "correct" | "incorrect" | "final";
}

export default function QuizButton({ children, state = "default", ...props }: QuizButtonProps) {
  switch (state) {
    case "correct":
      return (
        <Button
          fullWidth disableElevation disableRipple disableFocusRipple
          variant="contained" color="success" {...props} sx={{
            cursor: "default", padding: "8px 20px 8px 20px",
          }}
        >
          <CheckIcon color="success" sx={{ position: "absolute", right: "-40px" }} />
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
            cursor: "default", padding: "8px 20px 8px 20px",
          }}
        >
          <ClearIcon color="success" sx={{ position: "absolute", right: "-40px" }} />
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
            cursor: "default", padding: "8px 20px 8px 20px",
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
          fullWidth variant="outlined" color="primary" {...props} sx={{
            cursor: "pointer", padding: "8px 20px 8px 20px",
          }}
        >
          <Typography variant="button" sx={{ textAlign: "justify" }}>
            {children}
          </Typography>
        </Button>
      );
  }
}
