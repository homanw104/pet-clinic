import React from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { Fade, Skeleton, Stack } from "@mui/material";
import InfoCard from "@/lib/components/atomic/InfoCard";
import CaseListButton from "@/lib/components/case/CaseListButton";
import CategoryDataType from "@/lib/types/categoryDataType";

export default function CaseList({ sx, ...props }: {
  sx?: object;
}) {
  const router = useRouter();
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
        category.diseases.push(disease.name);
      } else {
        categoryList.push({
          categoryName: disease.category,
          diseases: [disease.name],
        });
      }
    }
  }

  return (
    <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" {...props} sx={{ ...sx, minHeight: "36rem" }}>
      <InfoCard>
        在下侧列表中选择疾病，查看相关案例！
      </InfoCard>

      <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch">
        {categoryList.map((category, i) => (
          <CaseListButton key={i} diseases={category.diseases}>
            {category.categoryName}
          </CaseListButton>
        ))}
      </Stack>
    </Stack>
  );
}
