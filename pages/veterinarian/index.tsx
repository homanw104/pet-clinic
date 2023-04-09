/**
 * 兽医职位介绍页面。
 */

import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import JobPageLayout from "@/layouts/job_page_layout";
import veterinarianIcon from "@/public/veterinarian.png";

export default function Veterinarian() {
  let title = "兽医";
  let subtitle = "veterinarian";
  let articleList = [
    { name: "流程一", href: "/test" },
    { name: "流程二", href: "/test" },
  ];

  return (
    <JobPageLayout src={veterinarianIcon} alt={title} title={title} subtitle={subtitle} articleList={articleList}>
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
