'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  ClickAwayListener, Fade,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import TypographyButton from "@/components/button/TypographyButton";
import { darkTheme, lightTheme } from "@/lib/styles/globals-mui";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { toggleTheme } from "@/lib/store/themeSlice";
import { raiseError } from "@/lib/store/errorSlice";
import { logout } from "@/lib/store/authSlice";
import { API_URL } from "@/lib/utils/env";

interface HeaderProps {
  mapBoxRef?: React.RefObject<HTMLDivElement | null>;   // Reference to the parent element of <MapViewer />
}

export default function Header({ mapBoxRef }: HeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const themeState = useAppSelector((state) => state.theme.theme);
  const username = useAppSelector((state) => state.auth.username);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(menuAnchorEl ? null : event.currentTarget);
    setIsMenuOpen((prev) => !prev);
  };

  const handleMenuClickAway = () => {
    setMenuAnchorEl(null);
    setIsMenuOpen(false);
  };

  const handleOnClick = async () => {
    handleMenuClickAway();
    await handleLogout();
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/logout`);
      setTimeout(() => dispatch(logout()), 500);
    } catch (error) {
      dispatch(raiseError(error));
    }
  };

  const handleToggleTheme = () => {
    // Manually toggle theme for <MapViewer />
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
      <Typography
        variant="h1" noWrap={true} className="unselectable"
        onClick={() => handleToggleTheme()}
      >
        Pet Clinic Online
      </Typography>

      {/* Display login button when logged out */}
      {!isLoggedIn &&
        <TypographyButton
          variant="h3" noWrap={true} className="unselectable"
          onClick={() => router.push("/login")}
        >
          {"登录"}
          <SubdirectoryArrowLeftIcon className="material-symbols" sx={{
            fontSize: theme.typography.h3.fontSize,
            position: "relative",
            top: "0.1em",
          }} />
        </TypographyButton>
      }

      {/* Display logout button with username when logged in */}
      {isLoggedIn &&
        <>
          <TypographyButton
            variant="h3" noWrap={true} className="unselectable"
            onClick={handleMenuClick}
          >
            {username}
          </TypographyButton>
          <Popper
            open={isMenuOpen} anchorEl={menuAnchorEl} transition
            placement="bottom-end"
            sx={{ paddingTop: "0.5rem" }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} in={isMenuOpen} timeout={100}>
                <Paper
                  sx={{
                    width: "12rem",
                    borderColor: theme.palette.outline.main,
                    borderWidth: "2px",
                    borderStyle: "solid",
                    borderRadius: 0
                  }}
                >
                  <ClickAwayListener onClickAway={handleMenuClickAway}>
                    <MenuList
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={() => {}}
                    >
                      <MenuItem><del>用户信息</del>（正在开发）</MenuItem>
                      <MenuItem onClick={handleOnClick}>登出</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        </>
      }
    </Stack>
  )
}
