import RoomBriefType from "@/types/roomBriefType";

const rooms: RoomBriefType[] = [
  {
    title: "前台区",
    subtitle: "reception",
    panoSrc: "/pano/reception.jpg",
    panoMarkers: [
      {
        id: "processing-paperwork",
        tooltip: "门诊室",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "500deg", pitch: "20deg" },
        data: { link: "/tour/outpatient-room" }
      },
    ],
  },
  {
    title: "档案室",
    subtitle: "records-dept",
    panoSrc: "/pano/records-dept.jpg",
    panoMarkers: null,
  },
  {
    title: "门诊室",
    subtitle: "outpatient-room",
    panoSrc: "/pano/outpatient-room.jpg",
    panoMarkers: [
      {
        id: "to-pharmacy",
        tooltip: "药房",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "45deg", pitch: "0deg" },
        data: { link: "/tour/pharmacy" }
      },
    ],
  },
  {
    title: "免疫室",
    subtitle: "vaccination-room",
    panoSrc: "/pano/pre-isolation-room.jpg",
    panoMarkers: [
      {
        id: "isolation",
        tooltip: "隔离",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "45deg", pitch: "0deg" },
        data: { link: "/tour/vaccination-room/isolation" }
      },
    ],
  },
  {
    title: "化验室",
    subtitle: "laboratory",
    panoSrc: "/pano/laboratory.jpg",
    panoMarkers: [
      {
        id: "medical-examination",
        tooltip: "医学检验",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "45deg", pitch: "0deg" },
        data: { link: "/tour/laboratory" }
      },
    ],
  },
  {
    title: "治疗室",
    subtitle: "treatment-room",
    panoSrc: "/pano/operating-room-two.jpg",
    panoMarkers: [
      {
        id: "medical-examination",
        tooltip: "医学检验",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "45deg", pitch: "0deg" },
        data: { link: "/tour/laboratory" }
      },
    ],
  },
  {
    title: "影像学检查室",
    subtitle: "radiology-room",
    panoSrc: "/pano/radiology-room.jpg",
    panoMarkers: [
      {
        id: "xray",
        tooltip: "X光检查",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "100deg", pitch: "5deg" },
        data: { link: "/tour/radiology-room/X-ray" }
      },
    ],
  },
  {
    title: "药房",
    subtitle: "pharmacy",
    panoSrc: "/pano/pharmacy.jpg",
    panoMarkers: [
      {
        id: "get-medicine",
        tooltip: "药品介绍",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "1000deg", pitch: "0deg" },
        data: { link: "/tour/pharmacy/prescription-medicine-label" }
      },
      {
        id: "read-medicine-prescription",
        tooltip: "阅读处方",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "1290deg", pitch: "5deg" },
        data: { link: "/tour/pharmacy/read-medicine-prescription" }
      },
      {
        id: "prescription-medicine-label",
        tooltip: "处方药标签",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "1300deg", pitch: "0deg" },
        data: { link: "/tour/pharmacy/prescription-medicine-label" }
      },
      {
        id: "guiding-pharmacy",
        tooltip: "指导用药",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "1500deg", pitch: "0deg" },
        data: { link: "/tour/pharmacy/guiding-pharmacy" }
      },
    ],
  },
  {
    title: "输液室",
    subtitle: "infusion-room",
    panoSrc: "/pano/infusion-room.jpg",
    panoMarkers: [
      {
        id: "preparation-area",
        tooltip: "手术准备室",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "2000deg", pitch: "0deg" },
        data: { link: "/tour/preparation-area" }
      },
    ],
  },
  {
    title: "手术准备室",
    subtitle: "preparation-area",
    panoSrc: "/pano/operating-room-one.jpg",
    panoMarkers: [
      {
        id: "operating-room",
        tooltip: "手术室",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "360deg", pitch: "0deg" },
        data: { link: "/tour/operating-room" }
      },
    ],
  },
  {
    title: "手术室",
    subtitle: "operating-room",
    panoSrc: "/pano/operating-room-two.jpg",
    panoMarkers: [
      {
        id: "outpatient-room",
        tooltip: "门诊室",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "40deg", pitch: "0deg" },
        data: { link: "/tour/outpatient-room" }
      },
    ],
  },
  {
    title: "住院部",
    subtitle: "inpatient-ward",
    panoSrc: "/pano/pharmacy-front.jpg",
    panoMarkers: [
      {
        id: "reception",
        tooltip: "前台",
        image: "/marker.png",
        size: { width: 32, height: 32 },
        position: { yaw: "45deg", pitch: "0deg" },
        data: { link: "/tour/reception" }
      },
    ],
  },
  {
    title: "病理剖检室",
    subtitle: "autopsy-room",
    panoSrc: "/pano/autopsy-room.jpg",
    panoMarkers: null,
  },
];

export default rooms;
