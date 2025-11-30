import React, { useContext, useState } from "react";
import { Button, ButtonProps, Collapse, Stack, Typography, useTheme } from "@mui/material";
import DiseaseDataType from "@/lib/types/DiseaseDataType";
import { DiseaseContext } from "@/lib/components/context/DiseaseContext";

export default function CaseListButton({ children, diseases, ...props }: {
  children: React.ReactNode;
  diseases: DiseaseDataType[];
} & ButtonProps) {
  const theme = useTheme();

  const { setDiseaseId } = useContext(DiseaseContext);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Stack spacing="0rem">
      <Button
        {...props}
        onClick={() => setIsExpanded(!isExpanded)}
        sx={{
          backgroundColor: theme.palette.surface[3],
          color: theme.palette.surface.onMain,
          overflow: "hidden",
          padding: 0,
          height: "3rem",
          borderRadius: "1rem",
        }}
      >
        <Stack direction="column" spacing="0.25rem" alignItems="center" justifyContent="stretch">
          <Typography variant="button" align="left" noWrap={true} lineHeight={1}>
            {children}
          </Typography>
        </Stack>
      </Button>

      <Collapse mountOnEnter unmountOnExit in={isExpanded}>
        <Stack direction="column" spacing="0.5rem" sx={{ marginTop: "0.5rem" }}>
          {diseases.map((disease, i) => (
            <Button
              key={i}
              onClick={() => setDiseaseId(disease.id)}
              sx={{
                color: theme.palette.surface.onMain,
                height: "2rem",
                borderRadius: "1rem",
              }}
            >
              <Stack direction="column" spacing="0.25rem" alignItems="center" justifyContent="stretch">
                <Typography variant="body2" align="left" noWrap={true} lineHeight={1}>
                  {disease.name}
                </Typography>
              </Stack>
            </Button>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
