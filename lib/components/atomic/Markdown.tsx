/**
 * Reference:
 *
 * - <https://v5.mui.com/material-ui/react-box/>
 * - <https://v5.mui.com/material-ui/react-typography/>
 * - <https://www.npmjs.com/package/markdown-to-jsx#optionsoverrides---override-any-html-tags-representation>
 */

import React from "react";
import Link from "next/link";
import Markdown, { MarkdownToJSX } from "markdown-to-jsx";
import { Box, Typography } from "@mui/material";

const fontFamily = "Noto Sans SC, Noto Sans, sans-serif";

// marginBottom is mainly used for creating spacing before a list.
// marginTop is set to create a minimal spacing after the last element.
const options = {
  overrides: {
    h1: {
      component: Typography,
      props: { fontFamily: fontFamily, marginBottom: "1.2rem", variant: "h4" },
    },
    h2: {
      component: Typography,
      props: { fontFamily: fontFamily, marginTop: "1.2rem", marginBottom: "1.0rem", variant: "h5" },
    },
    h3: {
      component: Typography,
      props: { fontFamily: fontFamily, marginTop: "1.0rem", marginBottom: "0.85rem", variant: "h6" },
    },
    h4: {
      component: Typography,
      props: { fontFamily: fontFamily, marginTop: "0.85rem", marginBottom: "0.7rem", variant: "caption", paragraph: true },
    },
    p: {
      component: Typography,
      props: { fontFamily: fontFamily, marginTop: "0.7rem", variant: "body1" },
    },
    ul: {
      component: Box,
      props: { fontFamily: fontFamily, component: "ul", marginTop: "0.7rem" }
    },
    ol: {
      component: Box,
      props: { fontFamily: fontFamily, component: "ol", marginTop: "0.7rem" }
    },
    li: {
      component: Box,
      props: { fontFamily: fontFamily, component: "li", marginLeft: "2em", typography: "body1" }
    },
    a: {
      component: Link
    }
  }
};

export default function MarkdownArticle({ children, ...props }: {
  children: string;
  options?: MarkdownToJSX.Options;
}) {
  return (
    <Markdown options={options} {...props}>
      {children}
    </Markdown>
  )
}
