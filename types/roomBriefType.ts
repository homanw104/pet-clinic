import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";

type RoomBriefType = {
  title: string;      // Chinese title
  subtitle: string;   // English title used in `contents` folder
  panoSrc: string;
  panoMarkers: null | MarkerConfig[];
};

export default RoomBriefType;
