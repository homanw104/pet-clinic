import { Metadata } from "next";
import { Box, Container } from "@mui/material";
import PageContent from "@/app/(quiz)/quiz/page-content";

export const metadata: Metadata = {
  title: "Quiz | Pet Clinic",
  description: "Pet clinic online learning platform."
};

export default function Page() {
  return (
    <Box position="relative" flexDirection="column" height="100lvh">
      <Container sx={{ flexGrow: 1 }}>
        <PageContent />
      </Container>
    </Box>
  );
}
