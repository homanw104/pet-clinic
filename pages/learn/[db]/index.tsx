/**
 * 数据库主页，根据数据库种类 [db] 从后端拉取不同的内容。
 */

import React, { ReactElement, useEffect } from "react";
import {
  Box,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "@/components/header/Header";
import Subheader from "@/components/header/Subheader";
import AppGridLayout from "@/layouts/AppGridLayout";
import databases from "@/contents/databases";
import { useRouter } from "next/router";
import axios from "axios";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { API_URL } from "@/utils/env_util";

export default function Learn() {
  const theme = useTheme();
  const [dataArray, setDataArray] = React.useState<any>([]);
  const [data, setData] = React.useState<any>();
  const router = useRouter();
  const {db} = router.query;
  const [open, setOpen] = React.useState(-1);
  const [origin_data, setOrigin_data] = React.useState([]);
  const [title, setTitle] = React.useState();
  const [introduction, setIntroduction] = React.useState();
  const [price, setPrice] = React.useState();
  const [form_data, setForm_data] = React.useState<any>([]);
  const handleData = (s: string) => {
    let newData: any = origin_data;
    //console.log(newData);
    let ReturnData = [];
    for (let i = 0; i < newData.length; i++) {
      if (newData[i].category == s) {
        ReturnData.push(newData[i]);
      }
    }
    //console.log(ReturnData);
    setData(ReturnData);
  }


  useEffect(() => {
    const set1 = new Set();
    console.log(db);
    setTitle(undefined);
    setIntroduction(undefined);
    setPrice(undefined);
    if (db == "case") {
      axios.get(`${API_URL}/listDisease/`)
        .then(response => {
          if (response.data.error_num === 1) {
            alert(response.data.msg);
          } else {
            setOrigin_data(response.data);
            for (let i = 0; i < response.data.length; i++) {
              set1.add(response.data[i].category);
            }
            //console.log(set1);
            const newArray = Array.from(set1);
            //console.log(newArray);
            setDataArray(newArray);

            setData(response.data);
            console.log(response.data);
          }
        }, error => {
          console.log(error);
        })
    } else if (db == "medication") {
      axios.get(`${API_URL}/listDisposition/`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
    } else if (db == "examination") {
      axios.get(`${API_URL}/listProject/`)
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
    }

  }, [db]);
  const handleFormData = (disease_id: string) => {

    axios.get(`${API_URL}/caseGroup/?disease_id=${disease_id}`)
      .then(response => {
        console.log(response.data);
        setForm_data(response.data);
      })
      .catch(error => {
        console.log(error);
      });

  }

  return (
    <>
      <Grid item xs={12}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem"
        }}>
          <Header/>
          <Subheader variant="learn"/>
        </Stack>
      </Grid>

      <Grid item xs={3}>
        <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="stretch" sx={{
          marginTop: "4rem",
          marginBottom: "4rem",
          minHeight: "600px",
        }}>
          <List>
            {db == "case" && dataArray && dataArray.map((item: any, index: number) => (
              <Box key={index}>
                <ListItemButton onClick={() => {
                  handleData(item);
                  //console.log(data);
                  if (open == index) {
                    setOpen(-1);
                  } else {
                    setOpen(index);
                  }
                }} sx={{
                  backgroundColor: theme.palette.surface[3],
                  borderRadius: "12px",
                }}>
                  <ListItemText primary={item}/>
                  {open == index ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open == index} timeout="auto" unmountOnExit>
                  {data && data.map((item: any, index: number) => (
                    <ListItemButton key={index} onClick={() => {
                      //router.push(`/learn/${db}/${index}`).then();
                      setTitle(item.disease_name);
                      setIntroduction(item.introduction);
                      handleFormData(item.disease_id);
                    }} sx={{

                      borderRadius: "12px",
                    }}>
                      <ListItemText primary={item.disease_name}/>
                    </ListItemButton>
                  ))}
                </Collapse>
              </Box>
            ))
            }
            {db == "medication" && data && data.map((item: any, index: number) => (
              <ListItemButton key={index} onClick={() => {
                setTitle(item.disposition_name);
                setIntroduction(item.introduction);
                setPrice(item.disposition_price);
                console.log(title)
              }} sx={{
                backgroundColor: theme.palette.surface[3],
                borderRadius: "12px",
              }}>
                <ListItemText primary={item.disposition_name}></ListItemText>
              </ListItemButton>
            ))}
            {db == "examination" && data && data.map((item: any, index: number) => (
              <ListItemButton key={index} onClick={() => {

                setTitle(item.project_name);
                setIntroduction(item.introduction);
                setPrice(item.project_price);
                console.log(title);
              }} sx={{
                backgroundColor: theme.palette.surface[3],
                borderRadius: "12px",
              }}>
                <ListItemText primary={item.project_name}></ListItemText>
              </ListItemButton>
            ))}
          </List>
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
          minHeight: "600px",
          padding: "2.5rem"
        }}>
          {db == "medication" && <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>{title}</Typography>
            <Typography variant="body1" gutterBottom>{introduction}</Typography>
            <Typography variant="body1" gutterBottom>价格为：{price}</Typography>
          </Stack>}
          {db == "examination" && <Stack spacing={2}>
            <Typography variant="h3" gutterBottom>{title}</Typography>
            <Typography variant="body1" gutterBottom>{introduction}</Typography>
            <Typography variant="body1" gutterBottom>价格为：{price}</Typography>
          </Stack>}
          {db == "case" &&
            <Box>
              <Typography variant="h3" gutterBottom>{title}</Typography>
              <Typography variant="body1" gutterBottom>{introduction}</Typography>
              {form_data.error_num != 1 && form_data?.map((item: any, index: number) => (
                <TableContainer key={index}>
                  <Table sx={{minWidth: 550}} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>病例{index + 1}</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell sx={{minWidth: 200}} component="th" scope="row">
                          病例情况
                        </TableCell>
                        <TableCell align="right">{item.admission}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          病例名称
                        </TableCell>
                        <TableCell align="right">{item.case_name}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          检查
                        </TableCell>
                        <TableCell align="right">{item.checking}</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          诊断报告

                        </TableCell>
                        <TableCell align="right">{item.diagnostic_result
                        }</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          病例名称

                        </TableCell>
                        <TableCell align="right">{item.disease__disease_name
                        }</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          患者年龄

                        </TableCell>
                        <TableCell align="right">{item.patient_age
                        }</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          患者品种

                        </TableCell>
                        <TableCell align="right">{item.patient_specie
                        }</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          患者体重

                        </TableCell>
                        <TableCell align="right">{item.patient_weight
                        }</TableCell>
                      </TableRow>
                      <TableRow
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                      >
                        <TableCell component="th" scope="row">
                          治疗方案

                        </TableCell>
                        <TableCell align="right">{item.treatment
                        }</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              ))}
              {form_data.error_num == 1 && <Typography sx={{marginTop: '5rem'}}>
                暂时无病例介绍
              </Typography>}
            </Box>
          }
        </Box>
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

export async function getStaticProps({params}: Params) {
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
        db: db.englishID,
      },
    })
  }

  return {
    paths: paths,
    fallback: false,
  };
}
