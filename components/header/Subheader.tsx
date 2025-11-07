import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Stack, Typography, useTheme } from "@mui/material";
import SouthWestIcon from '@mui/icons-material/SouthWest';
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import LaunchSharpIcon from "@mui/icons-material/LaunchSharp";
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import TypographyButton from "@/components/button/TypographyButton";
import databases from "@/contents/databases";

interface SubheaderProps {
  variant: "home" | "learn" | "quiz";
  onRandomQuestion?: () => void;
}

export default function Subheader({ variant, onRandomQuestion }: SubheaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const db = searchParams?.get("db")

  const handleOnClick = (href: string) => {
    router.push(href);
  };

  const handleRandomQuiz = () => {
    if (onRandomQuestion) {
      onRandomQuestion();
    }
  }

  switch (variant) {
    case "home":
      return (
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="h3" noWrap={true} className="unselectable">
            宠物医院在线导览
          </Typography>
          <Typography variant="h4" noWrap={true} className="unselectable">
            <SouthWestIcon sx={{
              fontSize: theme.typography.h4.fontSize,
              position: "relative",
              top: "0.2em",
            }} /> 点击职位/科室开始导览
          </Typography>
        </Stack>
      )

    case "learn":
      return (
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="h3" noWrap={true} className="unselectable">
            {db === "case" && "病例数据库"}
            {db === "examination" && "检查数据库"}
            {db === "medication" && "药品数据库"}
          </Typography>
          <Stack spacing={4} direction="row" justifyContent="flex-end" alignItems="baseline">
            <TypographyButton variant="h4" noWrap={true} onClick={
              () => handleOnClick("/")
            }>
              <WestOutlinedIcon sx={{
                fontSize: theme.typography.h4.fontSize,
                position: "relative",
                top: "0.2em",
              }} /> 返回导览
            </TypographyButton>

            {/* Render buttons, ignore the button that links to the current page */}
            {databases.map((database, index) => {
              if (database.englishID !== db) {
                return (
                  <TypographyButton variant="h4" noWrap={true} key={index} onClick={
                    () => handleOnClick(`/learn/${database.englishID}`)
                  }>
                    <LaunchSharpIcon sx={{
                      fontSize: theme.typography.h4.fontSize,
                      transform: "rotate(180deg)",
                      position: "relative",
                      top: "0.15em",
                    }} /> {database.chineseTitle}
                  </TypographyButton>
                )
              }
            })}

          </Stack>
        </Stack>
      )

    case "quiz":
      return (
        <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography variant="h3" noWrap={true} className="unselectable">
            在线测试
          </Typography>
          <Stack spacing={4} direction="row" justifyContent="flex-end" alignItems="baseline">
            <TypographyButton variant="h4" noWrap={true} onClick={
              () => handleOnClick("/")
            }>
              <WestOutlinedIcon sx={{
                fontSize: theme.typography.h4.fontSize,
                position: "relative",
                top: "0.2em",
              }} /> 返回导览
            </TypographyButton>
            <TypographyButton variant="h4" noWrap={true} onClick={
              () => handleRandomQuiz()
            }>
              <LoopSharpIcon sx={{
                fontSize: theme.typography.h4.fontSize,
                transform: "rotate(-45deg)",
                position: "relative",
                top: "0.15em",
              }} /> 随机下一题
            </TypographyButton>
          </Stack>
        </Stack>
      )
  }
}
