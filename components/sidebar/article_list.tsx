import React from "react";
import { useRouter } from "next/router";
import { List, ListItem, ListItemButton } from "@mui/material";
import ArticleInfoType from "@/types/article_info";

interface ListProps {
  articleList: ArticleInfoType[];
  subtitle: string;       // Sidebar title in English
}

export default function ArticleList({ articleList, subtitle }: ListProps) {
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <List>
      {Array.from(articleList).map((article, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handleOnClick(`/${subtitle}/${article.slug}`)}>
            {article.title}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
