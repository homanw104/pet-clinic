import { useRouter } from "next/navigation";
import { Box, Chip, Stack } from "@mui/material";

export default function QuizListChips({ sx, ...props }: {
  sx?: object;
}) {
  const router = useRouter();
  return (
    <Box sx={{ overflowX: "auto", ...sx }} {...props}>
      <Stack direction="row" spacing="0.5rem">
        {/* Placeholder for quiz list chips */}
        <Chip label="Placeholder" />
        <Chip label="Placeholder" />
        <Chip label="Placeholder" />
        <Chip label="Placeholder" />
        <Chip label="Placeholder" />
      </Stack>
    </Box>
  );
}
