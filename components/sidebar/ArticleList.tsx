'use client';

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ArticleBriefType from "@/lib/types/articleBriefType";

interface ComponentProps {
  articleBriefList: ArticleBriefType[];
  subtitle: string;
  section: string;
}

export default function ArticleList({ articleBriefList, subtitle, section }: ComponentProps) {
  const router = useRouter();
  const params = useParams();

  const handleOnClick = (href: string) => {
    router.push(href);
  };

  return (
    <List>
      {Array.from(articleBriefList).map((article, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={article.slug === params?.articleSlug}
            onClick={() => handleOnClick(`/${section}/${subtitle}/${article.slug}`)}
            sx={{ padding: "8px 16px 8px 32px" }}
          >
            <ListItemText primary={article.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
