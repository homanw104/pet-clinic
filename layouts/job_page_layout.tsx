/**
 * Job page layout built upon Home component.
 */

import React from "react";
import { useRouter } from "next/router";
import Image, { StaticImageData } from "next/image";
import {
  Box,
  Grid, IconButton,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArticleInfoType from "@/types/article_info";
import Home from "@/pages";

interface LayoutProps {
  children: React.ReactNode;
  src: StaticImageData;   // Image data
  alt: string;            // Image description
  title: string;          // Sidebar title
  subtitle: string;       // Sidebar title in English
  articleList: ArticleInfoType[];
}

function Overlay({ children, src, alt, title, subtitle, articleList }: LayoutProps) {
  const route = useRouter();
  const theme = useTheme();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <>
      <Grid item sm={3} position="relative">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "0", right: "0",
          overflow: "hidden",
        }}>
          <Box sx={{
            backgroundColor: theme.palette.surface[3],
            color: theme.palette.surface.onMain,
            position: "relative",
            overflow: "hidden",
            height: "152px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}>
            <Stack direction="column" padding="2rem">
              <Typography variant="h4" align="left" noWrap={true} lineHeight={1}>
                {title}
              </Typography>
              <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
                textTransform: "none", fontVariant: "small-caps"
              }}>
                {subtitle}
              </Typography>
            </Stack>
            <Image src={src} alt={alt} width={160} height={160} className="unselectable" style={{
              position: "absolute",
              bottom: "-8px",
              right: "-8px",
              opacity: "30%"
            }}/>
          </Box>
          <List>
            {Array.from(articleList).map((article, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleOnClick(`/${subtitle}/${article.slug}`)}>
                  {article.title}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item sm={9} position="relative">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "2rem", right: "0",
        }}>
          <Box sx={{
            overflow: "scroll",
            height: "100%",
            padding: "2.5rem",
          }}>
            {children}
          </Box>
          <Box sx={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
          }}>
            <IconButton aria-label="close" onClick={() => handleOnClick("/")}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Paper>
      </Grid>
    </>
  )
}

export default function JobPageLayout({ children, ...props }: LayoutProps) {
  return (
    <Home overlay={
      <Overlay {...props}>{children}</Overlay>
    } />
  )
}
