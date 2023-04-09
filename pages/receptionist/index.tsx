/**
 * 前台职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/components/layout/job_page_layout";
import receptionistIcon from "@/public/receptionist.png";

export default function Receptionist() {
  let jobName = "前台";
  let jobList = ["流程一", "流程二"];

  return (
    <JobPageLayout jobName={jobName} jobList={jobList} src={receptionistIcon} alt="前台" name="receptionist">
      <Typography variant="h3">职位学习 - 前台</Typography>
      <Image
        src="/background.jpg"
        alt="dog"
        width={500}
        height={500}
      />
    </JobPageLayout>
  )
}
