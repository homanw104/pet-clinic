import { StaticImageData } from "next/image";

type JobInfoType = {
  title: string;      // Chinese title
  subtitle: string;   // English title used in `contents` folder
  avatar: StaticImageData;
};

export default JobInfoType;
