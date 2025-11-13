'use client';

import "@photo-sphere-viewer/core/index.scss";
import "@photo-sphere-viewer/markers-plugin/index.scss"
import React, { createRef, RefObject, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, useTheme } from "@mui/material";
import { hexToRGBA } from "@/lib/utils/color";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkerConfig, MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";

const lang = {
  zoom: "缩放",
  zoomOut: "缩小",
  zoomIn: "放大",
  moveUp: "向上",
  moveDown: "向下",
  moveLeft: "向左",
  moveRight: "向右",
  download: "下载",
  fullscreen: "全屏",
  menu: "菜单",
  close: "关闭",
  twoFingers: "使用双指浏览",
  ctrlZoom: "按住 ctrl 并使用滚轮放大",
  loadError: "无法加载图片",
};

interface PageProps {
  src: string;
  markers?: MarkerConfig[];
}

export default function PhotoSphere({ src, markers }: PageProps) {
  const theme = useTheme();
  const router = useRouter();
  const containerRef: RefObject<HTMLDivElement | null> = createRef();

  // Inject className and position to markers (`.sphere-tooltip` style overrides are at the end of this file)
  if (markers) {
    markers = markers.map((marker) => {
      if (typeof marker.tooltip === "string") {
        const tooltip = marker.tooltip;
        marker.tooltip = {content: tooltip, position: "center left", className: "sphere-tooltip", trigger: "hover"}
      } else {
        const tooltip = marker.tooltip ? marker.tooltip.content : "";
        marker.tooltip = {content: tooltip, position: "center left", className: "sphere-tooltip", trigger: "hover"}
      }
      return marker;
    })
  }

  useEffect(() => {
    // Load viewer after component mount
    const viewer = new Viewer({
      container: containerRef.current as HTMLElement,
      panorama: src,
      lang: lang,
      loadingTxt: "正在加载",
      touchmoveTwoFingers: false,
      navbar: ["zoomOut", "zoomIn", "description", "caption", "fullscreen"],
      plugins: [
        [MarkersPlugin, { markers }]
      ],
    });

    // Register click event on markers
    const markersPlugin = viewer.getPlugin(MarkersPlugin);
    markersPlugin.addEventListener("select-marker", ({ marker }) => {
      router.push(marker.data.link);
    });

    // Destroy viewer when component unmounts
    return () => {
      viewer.destroy();
    };
  }, [containerRef, src, markers, router]);

  return (
    <Box ref={containerRef} sx={{
      borderRadius: "0.5rem",
      overflow: "hidden",
      height: "100%",

      // Tooltip style overrides
      "& .sphere-tooltip": {
        color: theme.palette.surface.onMain,
        borderColor: theme.palette.outline.main,
        backgroundColor: theme.palette.surface[1],
        borderWidth: "2px",
        borderStyle: "solid",
        borderRadius: "0",
        padding: "4px 8px 4px 8px",
        boxShadow: `0 0 8px ${hexToRGBA(theme.palette.surface.onMain, 0.1)}`,
      },
      "& .psv-tooltip-content": {
        color: theme.palette.surface.onMain,
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        textShadow: "none",
      },
      "& .psv-tooltip-arrow": {
        border: "none",
      },
    }} />
  )
}
