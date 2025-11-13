/**
 * Markers used in MapViewer (not for photospheres).
 * Photosphere markers are stored in `rooms.ts`.
 */

import { LatLng } from "leaflet";

const markers = [
  {
    tooltip: "前台区",
    position: new LatLng(290, 720),
    href: "/tour/reception",
  },
  {
    tooltip: "药房",
    position: new LatLng(480, 260),
    href: "/tour/pharmacy",
  },
  {
    tooltip: "门诊室",
    position: new LatLng(600, 500),
    href: "/tour/outpatient-room",
  },
  {
    tooltip: "治疗室",
    position: new LatLng(700, 700),
    href: "/tour/treatment-room",
  },
  {
    tooltip: "手术准备室",
    position: new LatLng(800, 900),
    href: "/tour/preparation-area",
  },
  {
    tooltip: "手术室",
    position: new LatLng(920, 1140),
    href: "/tour/operating-room",
  },
  {
    tooltip: "住院部",
    position: new LatLng(960, 1500),
    href: "/tour/inpatient-ward",
  },
  {
    tooltip: "档案室",
    position: new LatLng(770, 1880),
    href: "/tour/records-dept",
  },
  {
    tooltip: "影像学检查室",
    position: new LatLng(650, 1440),
    href: "/tour/radiology-room",
  },
  {
    tooltip: "输液室",
    position: new LatLng(600, 1140),
    href: "/tour/infusion-room",
  },
  {
    tooltip: "病理剖检室",
    position: new LatLng(500, 1340),
    href: "/tour/autopsy-room",
  },
  {
    tooltip: "化验室",
    position: new LatLng(340, 1020),
    href: "/tour/laboratory",
  },
  {
    tooltip: "免疫室",
    position: new LatLng(440, 820),
    href: "/tour/vaccination-room",
  },
]

export default markers;
