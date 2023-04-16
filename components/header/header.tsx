import React from "react";
import { useRouter } from "next/router";
import { Stack, Typography } from "@mui/material";
import { darkTheme, lightTheme } from "@/styles/globals-mui";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { toggleTheme } from "@/store/themeSlice";
import { logout } from "@/store/authSlice";
import TypographyButton from "@/components/button/typography_button";

interface HeaderProps {
  mapBoxRef: React.RefObject<HTMLDivElement>; // Reference to the parent element of the <MapViewer />
}

export default function Header({ mapBoxRef }: HeaderProps) {
  const route = useRouter();
  const dispatch = useAppDispatch();

  const themeState = useAppSelector((state) => state.theme.theme);
  const username = useAppSelector((state) => state.auth.username);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleOnClick = (href: string) => {
    route.push(href).then();
  };

  const handleLogout = () => {
    dispatch(logout(""));
  };

  const handleToggleTheme = () => {
    // First, manually toggle theme for <MapViewer />
    if (mapBoxRef.current &&
      mapBoxRef.current.children[0] &&
      mapBoxRef.current.children[0] instanceof HTMLDivElement &&
      mapBoxRef.current.children[0].className === "leaflet-container"
    ) {
      const mapViewerRef = mapBoxRef.current.children[0];
      if (themeState === "lightTheme") {
        mapViewerRef.style.backgroundColor = darkTheme.palette.surface[1];
      } else {
        mapViewerRef.style.backgroundColor = lightTheme.palette.surface[1];
      }
    }

    // Toggle global theme
    dispatch(toggleTheme());
  };

  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
      <Typography variant="h1" noWrap={true} className="unselectable" onClick={
        () => handleToggleTheme()
      }>
        Pet Clinic Online
      </Typography>

      {/* Display login button when logged out */}
      {!isLoggedIn &&
        <TypographyButton variant="h3" noWrap={true} className="unselectable" onClick={
          () => handleOnClick("/login")
        }>
          登录 <span className="material-symbols" style={{
            position: "relative",
            top: "0.15em"
          }}>{"\u{e5d9}"}</span>
        </TypographyButton>
      }

      {/* Display logout button with username when logged in */}
      {isLoggedIn &&
        <TypographyButton variant="h3" noWrap={true} className="unselectable" onClick={
          ()=> handleLogout()
        }>
          {`{{ ${username} }}`}
        </TypographyButton>
      }
    </Stack>
  )
}
