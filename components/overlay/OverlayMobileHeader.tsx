'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Box, Collapse, IconButton, Paper, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArticleList from "@/components/overlay/ArticleList";
import { unmountOverlay } from "@/lib/store/overlaySlice";
import { useAppDispatch } from "@/lib/utils/hook";
import ArticleBriefType from "@/lib/types/articleBriefType";

export default function OverlayMobileHeader({ section, title, subtitle, articleBriefList, ...props }: {
  section: string;
  title: string;
  subtitle: string;
  articleBriefList: ArticleBriefType[];
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isArticleListOpen, setIsArticleListOpen] = useState(false);

  const handleToggleArticleList = () => {
    setIsArticleListOpen(!isArticleListOpen);
  };

  const handleCloseOverlay = () => {
    dispatch(unmountOverlay());
    setTimeout(() => router.push("/"), 300);
  };

  const handleOnclick = (event: React.MouseEvent<HTMLElement>) => {
    // Allow clicking inside the box without toggling close in the parent
    event.stopPropagation();
  }

  return (
    <Box
      position="absolute" zIndex="200"
      top="1rem" left="1rem" right="1rem"
      height={isArticleListOpen ? "calc(100lvh - 2rem)" : "6.5rem"}
      {...props}
    >
      <Paper sx={{ overflow: "hidden", borderRadius: "1rem" }} onClick={handleOnclick}>
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" height="4.5rem" padding="1rem">
            <Stack direction="row" alignItems="center" spacing="0.5rem">
              <IconButton onClick={handleToggleArticleList}><MenuIcon /></IconButton>
              {section === "job" ?
                <Typography variant="h6">{title}</Typography>
                :
                <Link href={`/${section}/${subtitle}`}>
                  <Typography variant="h6">{title}</Typography>
                </Link>
              }
            </Stack>
            <IconButton onClick={handleCloseOverlay}><CloseIcon /></IconButton>
          </Stack>
          <Collapse onClick={handleToggleArticleList} in={isArticleListOpen}>
            <Box maxHeight="calc(100lvh - 6.5rem)" overflow="auto">
              <ArticleList articleBriefList={articleBriefList} subtitle={subtitle} section={section} />
            </Box>
          </Collapse>
        </Stack>
      </Paper>
    </Box>
  )
}
