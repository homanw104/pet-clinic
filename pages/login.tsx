import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginPageLayout from "@/layouts/login_page_layout";
import Link from "next/link";
import * as React from "react";
import { useDispatch } from "react-redux";
import { LogIn, selectAuth ,LogOut} from "@/store/authSlice"
import { useAppSelector } from "@/app/hooks";
import axios from "axios";

export default function Login() {
  const [username,setUsername] = React.useState("");
  const [password,setPassword] = React.useState("");

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

  }

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
  function Logout(){

    axios.get(`https://api.petclinic.homans.world:8443/logout?user=${username}/`)
      .then(response =>{
        console.log(response.data);
        //@ts-ignore
        dispatch((LogOut("")));
      },error =>{
        console.log(error);
      })
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
        defaultValue={""}
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>{
          setPassword(event.target.value)
        }}
      />
      <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        <Button>忘记密码？</Button>
        <Stack spacing={2} direction="row" justifyContent="space-between">

            <Button variant="outlined" onClick={()=>{
              Logout();
            }
            }>登出</Button>

          <Link href="/">
            <Button variant="contained" disableElevation
                    onClick={()=>{
                     // console.log(Auth);

                      Login();
                    }}
            >登录</Button>
          </Link>
        </Stack>
      </Stack>
    </LoginPageLayout>
  )
}
