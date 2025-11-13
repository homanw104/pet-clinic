'use client';

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch } from "@/lib/utils/hook";
import { API_URL } from "@/lib/utils/env";

export default function PageContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isWarningDialogOpen, setIsWarningDialogOpen] = React.useState(false);

  const handleOnClick = () => {

  }

  const handleLogin = () => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    axios.post(`${API_URL}/login/`, params)
      .then(response => {

      })
      .catch(error => {

      });
  }

  return (
    <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
      <Typography variant="h4">登录</Typography>
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
      <Box sx={{paddingTop: "6.5rem"}}>
        <Button
          variant="contained" size="large" disableElevation
          onClick={handleOnClick}
          sx={{ width: "100%" }}
        >
          登录
        </Button>
      </Box>
    </Stack>
  )
}
