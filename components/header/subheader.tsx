import { Stack, Typography } from "@mui/material";
import React from "react";

export default function Subheader() {
  return (
    <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="baseline">
      <Typography variant="h3" noWrap={true}>宠物医院在线导览</Typography>
      <Typography variant="h4" noWrap={true}>
        <span className="material-symbols" style={{
          position: "relative",
          top: "0.2em"
        }}>{"\u{f1e5}"}</span> 点击职位/科室开始导览
      </Typography>
    </Stack>
  )
}
