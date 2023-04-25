import React from "react";
import { useRouter } from "next/router";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ArticleBriefType from "@/types/articleBriefType";

interface ListProps {
  articleList: ArticleBriefType[];
  linkPrefix: string;
}

export default function ArticleList({ articleList, linkPrefix }: ListProps) {
  const router = useRouter();

  const handleOnClick = (href: string) => {
    router.push(href).then();
  };

  return (
    <List>
      {Array.from(articleList).map((article, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            selected={router.asPath.startsWith(`${linkPrefix}/${article.slug}`)}
            onClick={() => handleOnClick(`${linkPrefix}/${article.slug}`)}
            sx={{ padding: "8px 16px 8px 32px" }}
          >
            <ListItemText primary={article.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
