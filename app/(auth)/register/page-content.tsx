'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import ErrorDialog from "@/components/atomic/ErrorDialog";
import { API_URL } from "@/lib/utils/env";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { raiseError, resetError } from "@/lib/store/errorSlice";

export default function PageContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, {
        "email": email,
        "username": username,
        "password": password
      });
      setIsSuccess(true);
      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (data.message === "Email already registered") {
          setIsEmailRegistered(true);
        } else if (data.message === "Username already exists") {
          setIsUsernameTaken(true);
        } else {
          dispatch(raiseError(data.message));
        }
      } else {
        dispatch(raiseError(error));
      }
      setIsLoading(false);
    }
  }

  const handleOnClick = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const emailValid = emailRegex.test(email) && email.length <= 50;
    const usernameValid = username.length >= 3 && username.length <= 15;
    const passwordValid = password.length >= 8 && password.length <= 20;
    const passwordMatch = password === repeatPassword;

    setIsEmailValid(emailValid);
    setIsUsernameValid(usernameValid);
    setIsPasswordValid(passwordValid);
    setIsPasswordMatch(passwordMatch);

    if (emailValid && usernameValid && passwordValid && passwordMatch
      && !isEmailRegistered && !isUsernameTaken
    ) {
      setIsLoading(true);
      handleRegister().then();
    }
  }

  return (
    <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Typography variant="h4">注册</Typography>
      <Box component="form" width="100%">
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="邮箱" variant="outlined" type="text" margin="dense" fullWidth required
          autoComplete="email"
          error={!isEmailValid || isEmailRegistered}
          helperText={!isEmailValid ? "无效的邮箱地址" : isEmailRegistered ? "该邮箱已被注册" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
            setIsEmailValid(true);
            setIsEmailRegistered(false);
          }}
        />
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="用户名" variant="outlined" type="text" margin="dense" fullWidth required
          autoComplete="username"
          error={!isUsernameValid || isUsernameTaken}
          helperText={!isUsernameValid ? "用户名需要 3 ~ 15 个字符" : isUsernameTaken ? "该用户名已被占用" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
            setIsUsernameValid(true);
            setIsUsernameTaken(false);
          }}
        />
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="密码" variant="outlined" type="password" margin="dense" fullWidth required
          autoComplete="new-password"
          error={!isPasswordValid}
          helperText={!isPasswordValid ? "密码需要 8 ~ 20 个字符" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setIsPasswordValid(true);
          }}
        />
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="重复密码" variant="outlined" type="password" margin="dense" fullWidth required
          autoComplete="new-password"
          error={!isPasswordMatch}
          helperText={!isPasswordMatch ? "两次输入的密码不匹配" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setRepeatPassword(event.target.value);
            setIsPasswordMatch(true);
          }}
        />
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ paddingTop: "2rem" }}>
          <Box display={isSuccess ? "block" : "none"} sx={{ marginRight: "1rem" }}>
            <DoneIcon color="success"/>
          </Box>
          <Button
            variant="contained" type="submit" size="large" disableElevation
            disabled={isLoading}
            onClick={handleOnClick}
            sx={{ marginRight: "1rem" }}
          >
            注册
          </Button>
          <Button
            variant="outlined" size="large" disableElevation
            onClick={() => { router.push("/login")}}
          >
            登录
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
