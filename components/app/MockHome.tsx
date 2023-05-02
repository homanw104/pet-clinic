/**
 * Mock Home component without map and links to increase performance.
 */

import React from "react";
import Image from "next/image";
import { Box, Grid, Stack, useTheme } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import InfoCard from "@/components/atomic/InfoCard";
import AvatarButton from "@/components/button/AvatarButton";
import NavButton from "@/components/button/NavButton";
import receptionistIcon from "@/public/avatar/receptionist.png";
import technicianIcon from "@/public/avatar/technician.png";
import veterinarianIcon from "@/public/avatar/veterinarian.png";
import floorPlan from "@/public/floor-plan.png";
import { useAppSelector } from "@/utils/hook_util";

export default function MockHome() {
  const theme = useTheme();

  const isMount = useAppSelector((state) => state.overlay.isMount);

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="home" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem", marginBottom: "4rem"
        }}>
          <InfoCard>在下方选择职位或在右侧选择科室以开始导览。</InfoCard>
          <AvatarButton src={receptionistIcon} alt="前台" name="receptionist">前台</AvatarButton>
          <AvatarButton src={technicianIcon} alt="医助" name="technician">医助</AvatarButton>
          <AvatarButton src={veterinarianIcon} alt="兽医" name="veterinarian">兽医</AvatarButton>
          <Stack spacing={2} direction="row" justifyContent="center">
            <NavButton name="database" style={{ width: "100%" }}>病例库</NavButton>
            <NavButton name="quiz" style={{ width: "100%" }}>在线测试</NavButton>
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={9}>
        <Box sx={{
          backgroundColor: theme.palette.surface.main,
          color: theme.palette.surface.onMain,
          marginTop: "4rem",
          marginBottom: "4rem",
          marginLeft: "2rem",
          borderRadius: "0.75rem",
          overflow: "hidden",
          height: "600px",
        }}>
          <Box sx={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            overflow: "hidden",
            height: "100%",
          }}>
            <Box sx={{
              borderRadius: "0.25rem",
              overflow: "hidden",
              height: "100%",
            }}>
              <Stack alignItems="center" justifyContent="center" sx={{
                backgroundColor: theme.palette.surface[1],
                height: "100%",

                // Fade in blur used on image
                "@keyframes mockHomeFadeInBlur": {
                  "from": { filter: "blur(5px)" },
                  "to": { filter: "blur(40px)" },
                },

                // Fade out blur used on image
                "@keyframes mockHomeFadeOutBlur": {
                  "from": { filter: "blur(40px)" },
                  "to": { backdropFilter: "blur(5px)" },
                },

                animation: isMount ?
                  "mockHomeFadeInBlur 0.3s ease-out forwards" :
                  "mockHomeFadeOutBlur 0.3s ease-in forwards",
              }}>
                <Image
                  src={floorPlan}
                  alt="Floor plan"
                  width={2100/2.8}
                  height={1200/2.8}
                />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  )
}
