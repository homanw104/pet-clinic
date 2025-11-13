import RoomBriefType from "@/lib/types/roomBriefType";

const rooms: RoomBriefType[] = [
  {
    chineseTitle: "前台区",
    englishID: "reception",
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
    chineseTitle: "档案室",
    englishID: "records-dept",
    panoSrc: "/pano/records-dept.jpg",
    panoMarkers: undefined,
  },
  {
    chineseTitle: "门诊室",
    englishID: "outpatient-room",
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
    chineseTitle: "免疫室",
    englishID: "vaccination-room",
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
    chineseTitle: "化验室",
    englishID: "laboratory",
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
    chineseTitle: "治疗室",
    englishID: "treatment-room",
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
    chineseTitle: "影像学检查室",
    englishID: "radiology-room",
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
    chineseTitle: "药房",
    englishID: "pharmacy",
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
    chineseTitle: "输液室",
    englishID: "infusion-room",
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
    chineseTitle: "手术准备室",
    englishID: "preparation-area",
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
    chineseTitle: "手术室",
    englishID: "operating-room",
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
    chineseTitle: "住院部",
    englishID: "inpatient-ward",
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
    chineseTitle: "病理剖检室",
    englishID: "autopsy-room",
    panoSrc: "/pano/autopsy-room.jpg",
    panoMarkers: undefined,
  },
];

export default rooms;
