'use client';

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ErrorDialog from "@/components/atomic/ErrorDialog";
import { login } from "@/lib/store/authSlice";
import { raiseError, resetError } from "@/lib/store/errorSlice";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hook";
import { API_URL } from "@/lib/utils/env";

export default function PageContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [isIdentifierValid, setIsIdentifierValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isIdentifierNotFound, setIsIdentifierNotFound] = useState(false);
  const [isPasswordIncorrect, setIsPasswordNotMatch] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isError = useAppSelector(state => state.error.isError);
  const errorMsg = useAppSelector(state => state.error.errorMsg);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        "identifier": identifier,
        "password": password
      });
      dispatch(login(response.data.user.username));
      setIsSuccess(true);
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        if (data.message === "Username or email does not exist") {
          setIsIdentifierNotFound(true);
        } else if (data.message === "Password does not match") {
          setIsPasswordNotMatch(true);
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
    const identifierValid = identifier.length > 0;
    const passwordValid = password.length > 0;

    setIsIdentifierValid(identifierValid);
    setIsPasswordValid(passwordValid);

    if (identifierValid && passwordValid && !isIdentifierNotFound && !isPasswordIncorrect) {
      setIsLoading(true);
      handleLogin().then();
    }
  }

  return (
    <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
      <ErrorDialog open={isError} onClose={() => dispatch(resetError())} message={errorMsg} />
      <Typography variant="h4">登录</Typography>
      <Box component="form" width="100%">
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="用户名" variant="outlined" type="text" margin="dense" fullWidth required
          autoComplete="username"
          error={!isIdentifierValid || isIdentifierNotFound}
          helperText={!isIdentifierValid ? "用户名不能为空" : isIdentifierNotFound ? "未找到用户名或邮箱" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIdentifier(event.target.value);
            setIsIdentifierValid(true);
            setIsIdentifierNotFound(false);
            setIsPasswordNotMatch(false);
          }}
        />
        <TextField
          InputProps={{ readOnly: isLoading }}
          label="密码" variant="outlined" type="password" margin="dense" fullWidth required
          autoComplete="password"
          error={!isPasswordValid || isPasswordIncorrect}
          helperText={!isPasswordValid ? "密码不能为空" : isPasswordIncorrect ? "用户名或密码错误" : " "}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
            setIsPasswordValid(true);
            setIsPasswordNotMatch(false);
          }}
        />
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{paddingTop: "6.5rem"}}>
          <Box display={isSuccess ? "block" : "none"} sx={{ marginRight: "1rem" }}>
            <DoneIcon color="success"/>
          </Box>
          <Button
            variant="contained" type="submit" size="large" disableElevation
            disabled={isLoading}
            onClick={handleOnClick}
            sx={{ marginRight: "1rem" }}
          >
            登录
          </Button>
          <Button
            variant="outlined" size="large" disableElevation
            onClick={() => { router.push("/register") }}
          >
            注册
          </Button>
        </Box>
      </Box>
    </Stack>
  )
}
