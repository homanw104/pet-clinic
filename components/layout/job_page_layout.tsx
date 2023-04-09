/**
 * Job page layout built upon Home component.
 */

import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import Home from "@/pages";
import Image, { StaticImageData } from "next/image";

type LayoutProps = {
  children: React.ReactNode;
  jobName: string;
  jobList: string[];
  src: StaticImageData;
  alt: string;    // Image description
  name: string;   // Job name in English
};

function Overlay({ children, jobName, jobList, src, alt, name }: LayoutProps) {
  const route = useRouter();
  const theme = useTheme();

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  return (
    <>
      <Grid item sm={3} position="relative" display="flex" direction="column" justifyContent="center">
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
                {jobName}
              </Typography>
              <Typography variant="h6" align="left" noWrap={true} lineHeight={1} style={{
                textTransform: "none", fontVariant: "small-caps"
              }}>
                {name}
              </Typography>
            </Stack>
            <Image src={src} alt={alt} width={160} height={160} className="unselectable" style={{
              position: "absolute",
              bottom: "-0.5rem",
              right: "-0.5rem",
              opacity: "30%"
            }}/>
          </Box>
          <List>
            {Array.from(jobList).map((value, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => handleOnClick(value)}>
                  {value}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item sm={9} position="relative" display="flex" direction="column" justifyContent="center">
        <Paper style={{
          position: "absolute",
          top: "2rem", bottom: "2rem",
          left: "2rem", right: "0",
        }}>
          <Container sx={{
            overflow: "scroll",
            height: "100%"
          }}>
            {children}
          </Container>
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
