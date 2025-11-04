import React from "react";
import { useRouter } from "next/navigation";
import { Stack, Typography, useTheme } from "@mui/material";
import { darkTheme, lightTheme } from "@/styles/globals-mui";
import { useAppDispatch, useAppSelector } from "@/utils/hook_util";
import { toggleTheme } from "@/store/themeSlice";
import { logout } from "@/store/authSlice";
import TypographyButton from "@/components/button/TypographyButton";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

interface HeaderProps {
  mapBoxRef?: React.RefObject<HTMLDivElement>; // Reference to the parent element of the <MapViewer />
}

export default function Header({ mapBoxRef }: HeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const themeState = useAppSelector((state) => state.theme.theme);
  const username = useAppSelector((state) => state.auth.username);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleOnClick = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    dispatch(logout(""));
  };

  const handleToggleTheme = () => {
    // First, manually toggle theme for <MapViewer />
    if (mapBoxRef &&
      mapBoxRef.current &&
      mapBoxRef.current.children[0] &&
      mapBoxRef.current.children[0] instanceof HTMLDivElement &&
      mapBoxRef.current.children[0].className.includes("leaflet-container")
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
          登录
          <SubdirectoryArrowLeftIcon className="material-symbols" sx={{
            fontSize: theme.typography.h3.fontSize,
            position: "relative",
            top: "0.1em",
          }} />
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
