import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginPageLayout from "@/layouts/login_page_layout";
import Link from "next/link";
import * as React from "react";
import { createDispatchHook, useDispatch, useSelector } from "react-redux";
import { LogIn,LogOut, selectAuth } from "@/store/authSlice"
import { IUserState} from "@/store/authSlice"
import { useAppSelector } from "@/app/hooks";
import {getUserAsync} from "@/api/Login";
import axios from "axios";
import { bool } from "prop-types";
export default function Login() {
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");
  //const User = useUser();
  const Auth = useAppSelector(selectAuth)
  const dispatch = useDispatch();
  function  getUser1(){
    fetch('https://api.petclinic.homans.world:8443/users/',{
      mode:"no-cors"
    }).then(res=>res.json()
    ).then(data =>{
      console.log(data)
    }).catch(e =>{
      console.log(e)
    })

  };

  function Login(){
    const params = new URLSearchParams();
    let success= false;
    params.append('username',username);
    params.append('password',password);
    axios.post('https://api.petclinic.homans.world:8443/login/',params)
      .then(response =>{
        console.log(response.data);
        //@ts-ignore
        dispatch(LogIn(username))
      },error =>{
        console.log(error);
      }
      )





  }


  return (
    <LoginPageLayout>
      <Typography variant="h3">登录</Typography>
      <TextField
        id="username" label="用户名" variant="outlined"
        type="text"
        defaultValue={Auth}
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
          setUsername(event.target.value)
        }}
      />
      <TextField
        id="password" label="密码" variant="outlined"
        type="password"
        defaultValue={"请输入密码"}
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
          setPassword(event.target.value)
        }}
      />
      <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        <Button>忘记密码？</Button>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Link href="/sign-up">
            <Button variant="outlined">注册</Button>
          </Link>
          <Link href="/">
            <Button variant="contained"disableElevation
                    onClick={()=>{
                      //@ts-ignore
                      console.log(Auth);

                      Login();
                    }}
            >登录</Button>
          </Link>
        </Stack>
      </Stack>
    </LoginPageLayout>
  )
}
