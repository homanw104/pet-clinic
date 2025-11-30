"use client";

import React, { useContext } from "react";
import { Box, CircularProgress, Fade, Stack, Typography, useTheme } from "@mui/material";
import { DiseaseContext } from "@/lib/components/context/DiseaseContext";
import useSWR from "swr";
import MarkdownArticle from "@/lib/components/atomic/Markdown";

export default function PageContent() {
  const theme = useTheme();
  const { diseaseId } = useContext(DiseaseContext);
  const { data, error, isLoading } = useSWR(() => diseaseId ? `/disease/${diseaseId}` : null);

  const defaultText = "# 🐾 欢迎来到病例数据库\n\n本系统致力于为宠物医院提供高效、规范、可追溯的病例管理服务。通过集中化的数据存储与智能化的信息结构，本数据库可帮助兽医师快速查找病历、追踪诊疗过程、分析健康趋势，并为临床决策提供可靠依据。\n\n我们的目标是：\n\n* 提升病例管理效率：统一记录格式，支持快速检索与分类。\n* 保障医疗质量与安全：完整记录检查、诊疗、用药及随访信息。\n* 促进团队协作：多角色权限管理，支持医护团队共享病历数据。\n* 辅助临床研究：沉淀结构化病例数据，为科研与教学提供支持。\n\n无论是日常诊疗、长期健康管理，还是疑难病例分析，本系统都将成为您专业工作的有力工具。";
  
  return (
    <Box sx={{
      backgroundColor: theme.palette.surface.main,
      color: theme.palette.surface.onMain,
      borderRadius: "1rem",
      minHeight: "36rem"
    }}>
      {isLoading &&
        <Fade in={isLoading} style={{ transitionDelay: "200ms" }}>
          <Stack direction="column" alignItems="center" justifyContent="center" height="36rem">
            <CircularProgress />
          </Stack>
        </Fade>
      }

      {!isLoading && !data &&
        <Fade in>
          <Box padding="2rem">
            <MarkdownArticle>
              {defaultText}
            </MarkdownArticle>
          </Box>
        </Fade>
      }

      {!isLoading && data &&
        <Fade in={Boolean(data)}>
          <Box padding="2rem">
            <MarkdownArticle>
              {data.disease.description}
            </MarkdownArticle>
          </Box>
        </Fade>
      }

      {!isLoading && error &&
        <Fade in={error}>
          <Stack direction="row" alignItems="center" justifyContent="center" height="36rem">
            <Typography variant="h6" paddingLeft="0.5rem">加载失败！</Typography>
          </Stack>
        </Fade>
      }
    </Box>
  );
}
