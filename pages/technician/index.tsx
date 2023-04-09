/**
 * 助理职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/layouts/job_page_layout";
import technicianIcon from "@/public/technician.png";

export default function Technician() {
  let title = "医助";
  let subtitle = "technician";
  let articleList = [
    { name: "流程一", href: "/test" },
    { name: "流程二", href: "/test" },
  ];

  return (
    <JobPageLayout src={technicianIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
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
