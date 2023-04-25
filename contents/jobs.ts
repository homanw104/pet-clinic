import JobBriefType from "@/types/jobBriefType";
import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";

const jobs: JobBriefType[] = [
  {
    title: "前台",
    subtitle: "receptionist",
    avatar: receptionistIcon,
  },
  {
    title: "医助",
    subtitle: "technician",
    avatar: technicianIcon,

  },
  {
    title: "兽医",
    subtitle: "veterinarian",
    avatar: veterinarianIcon,
  },
];

export default jobs;
