/**
 * 助理职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/components/layout/job_page_layout";

export default function Technician() {
  let jobName = "助理";
  let jobList = ["流程一", "流程二"];

  return (
    <JobPageLayout jobName={jobName} jobList={jobList}>
      <Typography variant="h3">职位学习 - 医助</Typography>
      <Image
        src="/background.jpg"
        alt="dog"
        width={500}
        height={500}
      />
    </JobPageLayout>
  )
}
