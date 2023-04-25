import { StaticImageData } from "next/image";

type JobBriefType = {
  title: string;      // Chinese title
  subtitle: string;   // English title used in `contents` folder
  avatar: StaticImageData;
};

export default JobBriefType;
