/**
 * The layout of the main page is rendered client side to retain states,
 * while most of the layouts in this app are rendered server side.
 * This layout mainly handles mounting/unmounting the overlay.
 */

'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, useTheme } from "@mui/material";
import { hexToRGBA } from "@/lib/utils/color";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { unmountOverlay } from "@/lib/store/overlaySlice";
import LayoutContent from "@/app/(intro)/layout-content";

export default function Layout({ children }: {
  children: React.ReactNode
}) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Overlay mount state and visibility state
  const isMount = useAppSelector((state) => state.overlay.isMount);
  const [isVisible, setIsVisible] = React.useState(isMount);

  // Mouse drag threshold to differentiate between click and drag
  const dragThreshold = 5;  // Pixels
  let startX: number, startY: number;

  // Record mouse position when mouse is pressed down
  const handleOnMouseDown = (event: { clientX: number; clientY: number; }) => {
    startX = event.clientX;
    startY = event.clientY;
  }

  // Return home when a click is detected on the overlay box
  const handleOnClick = (event: { clientX: number; clientY: number; }) => {
    const endX = event.clientX;
    const endY = event.clientY;
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

    if (distance < dragThreshold) {
      dispatch(unmountOverlay());
      setTimeout(() => router.push("/"), 300);
    }
  }

  // Update visibility state based on mount state
  // When user goes to overlay page,
  //    > Click on target
  //    > isMount: false -> true
  //    > isVisible: false -> true
  //    > router.push()
  //    |------> animation time (300ms)
  // When user goes to home page,
  //    > Click on target
  //    > isMount: true -> false
  //    |------> animation time (300ms)
  //           > isVisible: true -> false
  //           > router.push()
  useEffect(() => {
    if (isMount) {
      setIsVisible(true);
    } else {
      const timeoutId = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isMount]);

  return (
    <>
      {/* The content of the main page is stored in the layout so that */}
      {/* it doesn't reload when navigating to overlay pages. */}
      <Box position="relative" flexDirection="column" height="100lvh">
        <Container sx={{ flexGrow: 1 }}>
          <LayoutContent />
        </Container>
      </Box>

      {/* Mount overlay when isVisible === true */}
      <Box position="absolute" display={isVisible ? "flex" : "none"} flexDirection="column" height="100lvh"
           onMouseDown={handleOnMouseDown}
           onClick={handleOnClick}
           sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,

        // Fade in blur used when opening overlay
        "@keyframes fadeInBlur": {
          "from": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0)",
          },
          "to": {
            backgroundColor: hexToRGBA(theme.palette.surface.onMain, 0.5),
            backdropFilter: "blur(10px)",
          },
        },

        // Fade out blur used when closing overlay
        "@keyframes fadeOutBlur": {
          "from": {
            backgroundColor: hexToRGBA(theme.palette.surface.onMain, 0.5),
            backdropFilter: "blur(10px)",
          },
          "to": {
            backgroundColor: "rgba(0, 0, 0, 0)",
            backdropFilter: "blur(0)",
          },
        },

        animation: isMount ?
          "fadeInBlur 0.3s ease-out forwards" :
          "fadeOutBlur 0.3s ease-in forwards"
      }}>
        <Container sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {children}
        </Container>
      </Box>
    </>
  )
}
