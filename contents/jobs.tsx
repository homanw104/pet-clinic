import JobInfoType from "@/types/job_info";
import receptionistIcon from "@/public/avatar/receptionist.png";

const jobs: JobInfoType[] = [
  {
    title: "前台",
    subtitle: "receptionist",
    avatar: receptionistIcon,
  },
  {
    title: "医助",
    subtitle: "technician",
    avatar: receptionistIcon,

  },
  {
    title: "兽医",
    subtitle: "veterinarian",
    avatar: receptionistIcon,
  },
];

export default jobs;
