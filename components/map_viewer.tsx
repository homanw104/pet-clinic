import "leaflet/dist/leaflet.css";
import { CRS, Icon, LatLng, LatLngBounds, Point } from "leaflet";
import { MapContainer, ImageOverlay, Marker, Tooltip } from "react-leaflet";
import { useTheme } from "@mui/material";
import { useRouter } from "next/router";

const markers = [
  {
    tooltip: "药房",
    position: new LatLng(480, 260),
    url: "/tour/pharmacy",
  },
  {
    tooltip: "门诊室",
    position: new LatLng(600, 500),
    url: "/tour/outpatient-room",
  },
  {
    tooltip: "治疗室",
    position: new LatLng(700, 700),
    url: "/tour/treatment-room",
  },
  {
    tooltip: "手术准备室",
    position: new LatLng(800, 900),
    url: "/tour/preparation-area",
  },
  {
    tooltip: "手术室",
    position: new LatLng(920, 1140),
    url: "/tour/operating-room",
  },
  {
    tooltip: "免疫室",
    position: new LatLng(440, 820),
    url: "/tour/vaccination-room",
  },
  {
    tooltip: "输液室",
    position: new LatLng(600, 1140),
    url: "/tour/infusion-room",
  },
  {
    tooltip: "前台区",
    position: new LatLng(290, 720),
    url: "/tour/reception",
  },
  {
    tooltip: "影像学检查室",
    position: new LatLng(650, 1440),
    url: "/tour/radiology-room",
  },
  {
    tooltip: "化验室",
    position: new LatLng(340, 1020),
    url: "/tour/laboratory",
  },
  {
    tooltip: "病理剖检室",
    position: new LatLng(500, 1340),
    url: "/tour/autopsy-room",
  },
  {
    tooltip: "档案室",
    position: new LatLng(770, 1880),
    url: "/tour/records-dept",
  },
  {
    tooltip: "住院部",
    position: new LatLng(960, 1500),
    url: "/tour/inpatient-ward",
  },
]

const markerIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: new Point(32, 32),
  shadowUrl: "/marker-shadow.png",
  shadowSize: new Point(40, 40),
});

interface MarkerProps {
  position: LatLng;
  tooltip: string;
  url: string;
}

function RoomMarker({ position, tooltip, url }: MarkerProps) {
  const route = useRouter();

  return (
    <Marker icon={markerIcon} position={position} eventHandlers={{
      click: () => route.push(url).then(),
    }}>
      <Tooltip direction="top" sticky>{tooltip}</Tooltip>
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
      style={{ height: "100%", backgroundColor: theme.palette.surface[1] }}
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
