import JobBriefType from "@/types/jobBriefType";
import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";

const jobs: JobBriefType[] = [
  {
    chineseTitle: "前台",
    englishID: "receptionist",
    avatar: receptionistIcon,
  },
  {
    chineseTitle: "医助",
    englishID: "technician",
    avatar: technicianIcon,

  },
  {
    chineseTitle: "兽医",
    englishID: "veterinarian",
    avatar: veterinarianIcon,
  },
];

export default jobs;
