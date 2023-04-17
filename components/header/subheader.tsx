import React from "react";
import { useRouter } from "next/router";
import { Stack, Typography, useTheme } from "@mui/material";
import SouthWestIcon from '@mui/icons-material/SouthWest';
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import LaunchSharpIcon from "@mui/icons-material/LaunchSharp";
import LoopSharpIcon from '@mui/icons-material/LoopSharp';
import TypographyButton from "@/components/button/typography_button";
import databases from "@/contents/databases";

interface SubheaderProps {
  variant: "home" | "learn" | "quiz";
}

export default function Subheader({ variant }: SubheaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { db } = router.query;

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  const handleRandomQuiz = () => {
    /* Generate a random quiz */
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
              if (database.slug !== db) {
                return (
                  <TypographyButton variant="h4" noWrap={true} key={index} onClick={
                    () => handleOnClick(`/learn/${database.slug}`)
                  }>
                    <LaunchSharpIcon sx={{
                      fontSize: theme.typography.h4.fontSize,
                      transform: "rotate(180deg)",
                      position: "relative",
                      top: "0.15em",
                    }} /> {database.title}
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
          <Typography variant="h3" noWrap={true}>
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
              }} /> 换一道题目
            </TypographyButton>
          </Stack>
        </Stack>
      )
  }
}
