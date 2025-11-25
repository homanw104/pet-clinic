import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { toggleTheme } from "@/lib/store/themeSlice";
import { useAccessibleButton } from "@/lib/utils/accessibility";
import { darkTheme, lightTheme } from "@/lib/styles/globals-mui";

export default function TitleButton({ mapBoxRef }: {
  mapBoxRef?: React.RefObject<HTMLDivElement | null>
}) {
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const isMount = useAppSelector(state => state.overlay.isMount);
  const themeName = useAppSelector((state) => state.theme.name);

  const handleToggleTheme = () => {
    // Manually toggle theme for <MapViewer />
    if (mapBoxRef &&
      mapBoxRef.current &&
      mapBoxRef.current.children[0] &&
      mapBoxRef.current.children[0] instanceof HTMLDivElement &&
      mapBoxRef.current.children[0].className.includes("leaflet-container")
    ) {
      const mapViewerRef = mapBoxRef.current.children[0];
      if (themeName === "lightTheme") {
        mapViewerRef.style.backgroundColor = darkTheme.palette.surface[1];
      } else {
        mapViewerRef.style.backgroundColor = lightTheme.palette.surface[1];
      }
    }

    // Toggle global theme
    dispatch(toggleTheme());
  };

  // Custom isButtonActive and tabIndex behavior for accessibility
  const { isButtonActive, tabIndex, ...a11yProps } = useAccessibleButton(handleToggleTheme);

  return (
    <Typography
      className="unselectable"
      variant={isXsScreen ? "h3" : isSmScreen ? "h2" : "h1"}
      tabIndex={isMount ? -1 : 0} {...a11yProps}
      onClick={handleToggleTheme} sx={{ cursor: "pointer" }}
    >
      Pet Clinic Online
    </Typography>
  );
}
