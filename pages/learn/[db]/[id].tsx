import React, { ReactElement, useEffect, useState } from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { Collapse, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack, Typography } from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";
import databases from "@/contents/databases";
import axios from "axios";
import { styled } from "@mui/system";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { setIn } from "immutable";

export default function Learn() {
  const [open,setOpen] = React.useState(true);
  const [title,setTitle] = React.useState();
  const [introduction,setIntroduction] = React.useState();
  const [data,setData] = React.useState([]);
  const router = useRouter();
  const [isQueryReady, setIsQueryReady] = useState(false);
  const [pageNotFound, setPageNotFound] = useState(false);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const { db, id } = router.query;
  function getIntroduction (){
    axios.get("https://api.petclinic.homans.world:8443/showCaseDetails/")
      .then(response =>{
        console.log(response);
      },error =>{
        console.log(error);
      })
  }
  // Update isQueryReady state when router is ready
  useEffect(() => {
    if (router.isReady) {
      setIsQueryReady(true);
    }
  }, [router.isReady]);

  // Update pageNoteFound state depending on the value of `db` and `id`
  useEffect(() => {
    if (!isQueryReady) return;
    if (typeof db !== "string" || typeof id !== "string") {
      // `db` and `id` should be a string, if not, set page as not found
      setPageNotFound(true);
    } else {
      // Check whether the value of `db` is valid, if not, set page not found
      let hasMatch = false;
      for (const database of databases) {
        if (database.slug === db) {
          hasMatch = true;
        }
      }
      if (!hasMatch) setPageNotFound(true);
    }
  }, [db, id, isQueryReady]);

  if (!isQueryReady) {
    // Setup loading state
  }

  if (pageNotFound) {
    return <ErrorPage statusCode={404} />
  }
  // useEffect(()=>{
  //   axios.get("https://api.petclinic.homans.world:8443/listCase/")
  //     .then(response =>{
  //       if(response.data.error_num ===1){
  //         alert(response.data.msg);
  //       }else {
  //         //setData(response.data);
  //         console.log(response.data);
  //         // console.log(data);
  //
  //         for(let i =0;i<response.data.length;i++){
  //           if(response.data[i].case_id = id){
  //             setTitle(response.data[i].case_name);
  //
  //           }
  //         }
  //       }
  //     },error =>{
  //       console.log(error);
  //     })
  //
  //
  //
  // },[])
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
                    setTitle(item.disease_name);
                    console.log(title);
                    setIntroduction(item.introduction);
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
        {<Stack spacing={2}>
          <Typography variant="h2" gutterBottom >{title}</Typography>
          <Typography variant="h3" gutterBottom>{introduction}</Typography>
        </Stack>}
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
