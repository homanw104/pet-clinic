import { MarkerConfig } from "@photo-sphere-viewer/markers-plugin";

type RoomBriefType = {
  chineseTitle: string;      // Chinese title
  englishID: string;   // English title used in `contents` folder
  panoSrc: string;
  panoMarkers: MarkerConfig[] | undefined;
};

export default RoomBriefType;
