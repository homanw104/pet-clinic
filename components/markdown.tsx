import React from "react";
import Link from "next/link";
import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';
import { Box, Typography } from "@mui/material";

function MarkdownListItem(props: any) {
  return <Box component="li" sx={{ mt: 1, typography: 'body1' }} {...props} />;
}

interface MarkdownProps {
  [key: string]: any;
  children: string;
  options?: MarkdownToJSX.Options;
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h4' },
    },
    h2: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h5' },
    },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6' },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'caption', paragraph: true },
    },
    p: {
      component: Typography,
      props: { paragraph: true },
    },
    a: { component: Link },
    li: {
      component: MarkdownListItem,
    },
  },
};

export default function MarkdownArticle({ children, ...props }: MarkdownProps) {
  return (
    <Markdown options={options} {...props}>
      {children}
    </Markdown>
  )
}
