import React from "react";
import { useRouter } from "next/router";
import { List, ListItem, ListItemButton } from "@mui/material";
import ArticleInfoType from "@/types/article_info";

interface ListProps {
  articleList: ArticleInfoType[];
  linkPrefix: string;
}

export default function ArticleList({ articleList, linkPrefix }: ListProps) {
  const route = useRouter();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <List>
      {Array.from(articleList).map((article, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => handleOnClick(`${linkPrefix}/${article.slug}`)}>
            {article.title}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
