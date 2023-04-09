/**
 * 前台职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/layouts/job_page_layout";
import receptionistIcon from "@/public/receptionist.png";

export default function Receptionist() {
  let title = "前台";
  let subtitle = "receptionist";
  let articleList = [
    { name: "流程一", href: "/test" },
    { name: "流程二", href: "/test" },
  ];

  return (
    <JobPageLayout src={receptionistIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
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
