import axios from "axios";
import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "@/utils/hook_util";
import { login } from "@/store/authSlice"
import LoginPageLayout from "@/layouts/LoginPageLayout";
import AppGridLayout from "@/layouts/AppGridLayout";
import { API_URL } from "@/utils/env_util";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  let Login_times = 3;
  const handleLogin = () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    axios.post(`${API_URL}/login/`, params)
      .then(response => {
        console.log(response);
        if (response.data['error_num'] == 1) {
          alert(`登录失败，还剩下${Login_times}次机会`)
          Login_times--;

        } else {
          dispatch(login(username));
          router.push("/").then();
        }

      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Typography variant="h3">登录</Typography>
      <TextField
        id="username" label="用户名" variant="outlined" type="text"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
        }}
      />
      <TextField
        id="password" label="密码" variant="outlined" type="password"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value)
        }}
      />
      <Box sx={{paddingTop: "5rem"}}>
        <Button
          variant="contained" size="large" disableElevation
          onClick={handleLogin}
          sx={{ width: "100%" }}
        >
          登录
        </Button>
      </Box>
    </>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppGridLayout bgImage="background-full.jpg" bgColor="#F4B21D">
      <LoginPageLayout>
        {page}
      </LoginPageLayout>
    </AppGridLayout>
  )
}
