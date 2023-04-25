/**
 * 数据库主页，根据数据库种类 [db] 从后端拉取不同的内容。
 */

import React, { ReactElement, useEffect } from "react";
import {
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";
import databases from "@/contents/databases";
import { useRouter } from "next/router";
import axios from "axios";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";

export default function Learn() {
  const [data,setData] = React.useState();
  const router = useRouter();
  const {db} = router.query;
  const [open,setOpen] = React.useState(true);
  useEffect(()=>{
    axios.get("https://api.petclinic.homans.world:8443/listDisease/")
      .then(response =>{
        if(response.data.error_num ===1){
          alert(response.data.msg);
        }else {
        setData(response.data);
          console.log(response.data);
        }
      },error =>{
        console.log(error);
      })
  },[])
  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header />
          <Subheader variant="learn" />
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <List>
          {data?.map((item,i)=>(
            <box>
              <ListItemButton onClick={()=>{
                console.log(item.category);
                //router.push(`/learn/${db}/`);
                setOpen(!open);

              }}>
                <ListItemText primary={item.category}/>
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton onClick={()=>{
                    router.push(`/learn/${db}/${i}`);
                  }} >
                    <ListItemText primary={item.disease_name}></ListItemText>
                  </ListItemButton>


                </List>
              </Collapse>
            </box>


            ))}
        </List>
      </Grid>

      <Grid item xs={9}>
        {/* content */}
      </Grid>
    </>
  )
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout>
      {page}
    </AppGridLayout>
  )
}

interface Params {
  params: {
    db: string;
  }
}

export async function getStaticProps({ params }: Params) {
  return {
    props: {
      db: params.db,
    }
  }
}

export async function getStaticPaths() {
  let paths = [];

  for (const db of databases) {
    paths.push({
      params: {
        db: db.slug,
      },
    })
  }

  return {
    paths: paths,
    fallback: false,
  };
}
