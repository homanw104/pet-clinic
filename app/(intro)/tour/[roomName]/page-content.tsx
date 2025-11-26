"use client";

import React from "react";
import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";
import OverlayViewerBox from "@/lib/components/overlay/OverlayViewerBox";

export default function PageContent({ panoSrc, panoMarkers }: {
  panoSrc: string;
  panoMarkers: MarkerConfig[] | undefined;
}) {
  return (
    <OverlayViewerBox
      src={panoSrc ? panoSrc : ""}
      markers={panoMarkers}
    />
  );
}
