/**
 * Markers used in MapViewer (not for photospheres).
 * Photosphere markers are stored in `rooms.ts`.
 */

import { LatLng } from "leaflet";

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

export default markers;
