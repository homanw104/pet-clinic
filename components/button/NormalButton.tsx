import { Button, ButtonProps, Stack, Typography, useTheme } from "@mui/material";

interface NormalButtonProps extends ButtonProps {
  name: string;   // Button name in English
}

export default function NormalButton({ children, name, ...props }: NormalButtonProps) {
  const theme = useTheme();

  return (
    <Button {...props} sx={{
      backgroundColor: theme.palette.surface[3],
      color: theme.palette.surface.onMain,
      overflow: "hidden",
      padding: 0,
      height: "140px",
    }}>
      <Stack direction="column" spacing={0.5} alignItems="center" justifyContent="stretch">
        <Typography variant="h5" align="left" noWrap={true} lineHeight={1}>
          {children}
        </Typography>
        <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
          textTransform: "none", fontVariant: "small-caps"
        }}>
          {name}
        </Typography>
      </Stack>
    </Button>
  )
}
