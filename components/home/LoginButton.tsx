'use client';

import React, { useState } from "react";
import axios from "@/lib/utils/axios";
import { useRouter } from "next/navigation";
import { ClickAwayListener, Fade, MenuItem, MenuList, Paper, Popper, useTheme } from "@mui/material";
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
import TypographyButton from "@/components/button/TypographyButton";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { raiseError } from "@/lib/store/errorSlice";
import { logout } from "@/lib/store/authSlice";

export default function LoginButton({ ...props }) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const username = useAppSelector((state) => state.auth.username);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  let fontSize;
  switch (props.variant) {
    case "h1": fontSize = theme.typography.h1.fontSize; break;
    case "h2": fontSize = theme.typography.h2.fontSize; break;
    case "h3": fontSize = theme.typography.h3.fontSize; break;
    case "h4": fontSize = theme.typography.h4.fontSize; break;
    case "h5": fontSize = theme.typography.h5.fontSize; break;
    case "h6": fontSize = theme.typography.h6.fontSize; break;
    default: fontSize = theme.typography.h3.fontSize; break;
  }

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
      await axios.post("/logout");
      setTimeout(() => dispatch(logout()), 500);
    } catch (error) {
      dispatch(raiseError(error));
    }
  };

  return (
    <>
      {/* Display login button when logged out */}
      {!isLoggedIn &&
        <TypographyButton
          noWrap={true} className="unselectable" {...props}
          onClick={() => router.push("/login")}
        >
          {"登录"}
          <SubdirectoryArrowLeftIcon className="material-symbols" sx={{
            fontSize: fontSize,
            position: "relative",
            top: "0.1em",
          }} />
        </TypographyButton>
      }

      {/* Display logout button with username when logged in */}
      {isLoggedIn &&
        <>
          <TypographyButton
            variant="h3" noWrap={true} className="unselectable" {...props}
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
    </>
  )
}
