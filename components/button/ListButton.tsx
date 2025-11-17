import { Button, ButtonProps, Stack, Typography, useTheme } from "@mui/material";

export default function ListButton({ children, ...props }: ButtonProps) {
  const theme = useTheme();

  return (
    <Button {...props} sx={{
      backgroundColor: theme.palette.surface[3],
      color: theme.palette.surface.onMain,
      overflow: "hidden",
      padding: 0,
      height: "2.5rem",
    }}>
      <Stack direction="column" spacing="0.25rem" alignItems="center" justifyContent="stretch">
        <Typography variant="button" align="left" noWrap={true} lineHeight={1}>
          {children}
        </Typography>
      </Stack>
    </Button>
  )
}
