import "@photo-sphere-viewer/core/index.scss";
import "@photo-sphere-viewer/markers-plugin/index.scss"
import React, { createRef, RefObject, useEffect } from "react";
import { Box } from "@mui/material";
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
  const containerRef: RefObject<HTMLDivElement> = createRef();

  useEffect(() => {
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

    // Destroy viewer when component unmounts
    return () => {
      viewer.destroy();
    };
  });

  return (
    <Box ref={containerRef} sx={{
      borderRadius: "0.25rem",
      overflow: "hidden",
      height: "100%",
    }} />
  )
}
