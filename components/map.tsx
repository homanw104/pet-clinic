import 'leaflet/dist/leaflet.css';
import { CRS, LatLng, LatLngBounds } from "leaflet";
import { MapContainer, ImageOverlay } from 'react-leaflet';
import { useTheme } from "@mui/material";

export default function Map() {
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
    </MapContainer>
  )
}
