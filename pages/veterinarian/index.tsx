/**
 * 兽医职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/components/layout/job_page_layout";
import veterinarianIcon from "@/public/veterinarian.png";

export default function Veterinarian() {
  let jobName = "兽医";
  let jobList = ["流程一", "流程二"];

  return (
    <JobPageLayout jobName={jobName} jobList={jobList} src={veterinarianIcon} alt="兽医" name="vetrinarian">
      <Typography variant="h3">职位学习 - 兽医</Typography>
      <Image
        src="/background.jpg"
        alt="dog"
        width={640}
        height={853}
      />
    </JobPageLayout>
  )
}
