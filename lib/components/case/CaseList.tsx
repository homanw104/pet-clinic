import React from "react";
import useSWR from "swr";
import { Fade, Skeleton, Stack } from "@mui/material";
import InfoCard from "@/lib/components/atomic/InfoCard";
import CaseListButton from "@/lib/components/case/CaseListButton";
import CategoryDataType from "@/lib/types/CategoryDataType";

export default function CaseList({ sx, ...props }: {
  sx?: object;
}) {
  const { data, error, isLoading } = useSWR("/disease");

  type backendDiseaseType = {
    id: string;
    name: string;
    category: string;
  }

  const categoryList: CategoryDataType[] = [];
  if (data) {
    for (const disease of data.diseases as backendDiseaseType[]) {
      const category = categoryList.find(cat => cat.categoryName === disease.category);
      if (category) {
        category.diseases.push({
          id: disease.id,
          name: disease.name
        });
      } else {
        categoryList.push({
          categoryName: disease.category,
          diseases: [{
            id: disease.id,
            name: disease.name
          }],
        });
      }
    }
  }

  return (
    <Stack spacing="1rem" direction="column" justifyContent="flex-start" alignItems="stretch" {...props} sx={{ ...sx, minHeight: "36rem" }}>
      <InfoCard>
        在下侧列表中选择疾病，查看相关案例！
      </InfoCard>

      {isLoading &&
        <Fade in={isLoading} style={{ transitionDelay: "250ms" }}>
          <Stack spacing="1rem" direction="column" justifyContent="flex-start" alignItems="stretch">
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
            <Skeleton variant="rounded" width="100%" height="3rem" sx={{ borderRadius: "1rem" }} />
          </Stack>
        </Fade>
      }

      {!isLoading && data &&
        <Fade in={data}>
          <Stack spacing="1rem" direction="column" justifyContent="flex-start" alignItems="stretch">
            {categoryList.map((category, i) => (
              <CaseListButton key={i} diseases={category.diseases}>
                {category.categoryName}
              </CaseListButton>
            ))}
          </Stack>
        </Fade>
      }

      {!isLoading && error &&
        // Display nothing on error
        <></>
      }
    </Stack>
  );
}
