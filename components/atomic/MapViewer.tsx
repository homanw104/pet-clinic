import "leaflet/dist/leaflet.css";
import styles from "@/styles/MapViewer.module.css";
import React from "react";
import { CRS, Icon, LatLng, LatLngBounds, Point } from "leaflet";
import { MapContainer, ImageOverlay, Marker, Tooltip } from "react-leaflet";
import { Typography, useTheme, Box } from "@mui/material";
import { useRouter } from "next/router";
import markers from "@/contents/markers";
import { hexToRGBA } from "@/utils/color_util";
import { useAppDispatch } from "@/utils/hook_util";
import { mountOverlay } from "@/store/overlaySlice";

interface MarkerProps {
  position: LatLng;
  tooltip: string;
  url: string;
}

function RoomMarker({ position, tooltip, url }: MarkerProps) {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const markerIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: new Point(32, 32),
    shadowUrl: "/marker-shadow.png",
    shadowSize: new Point(40, 40),
  });

  return (
    <Marker icon={markerIcon} position={position} eventHandlers={{
      click: () => {
        router.push(url).then();
        dispatch(mountOverlay());
      },
    }}>
      <Tooltip className={styles.tooltip} opacity={1} direction="left" sticky>
        <Box sx={{
          color: theme.palette.surface.onMain,
          borderColor: theme.palette.outline.main,
          backgroundColor: theme.palette.surface[1],
          borderWidth: "2px",
          borderStyle: "solid",
          padding: "4px 8px 4px 8px",
          boxShadow: `0 0 8px ${hexToRGBA(theme.palette.surface.onMain, 0.1)}`,
        }}>
          <Typography>{tooltip}</Typography>
        </Box>
      </Tooltip>
    </Marker>
  )
}

export default function MapViewer() {
  const theme = useTheme();

  // Set bounds and center based on image (floor-plan.png) resolution.
  const center = new LatLng(600, 1050);
  const bounds = new LatLngBounds(
    new LatLng(0, 0),
    new LatLng(1200, 2100)
  );
  const maxBounds = new LatLngBounds(
    new LatLng(-300, -525),
    new LatLng(1500, 2625)
  )

  return (
    <MapContainer
      attributionControl={false}
      zoomControl={false}
      boxZoom={false}
      zoomSnap={0}
      zoomDelta={0.5}
      zoom={-1.5}
      minZoom={-1.5}
      maxZoom={0}
      inertia={true}
      center={center}
      crs={CRS.Simple}
      maxBounds={maxBounds}
      style={{ height: "100%", borderRadius: "0.25rem", backgroundColor: theme.palette.surface[1] }}
    >
      <ImageOverlay
        url="/floor-plan.png"
        bounds={bounds}
      />

      {markers.map((marker, index) => (
        <RoomMarker
          position={marker.position}
          tooltip={marker.tooltip}
          url={marker.url}
          key={index}
        />
      ))}

    </MapContainer>
  )
}
