'use client';

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { API_URL } from "@/lib/utils/env";
import DoneIcon from '@mui/icons-material/Done';

export default function PageContent() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");

  const [isEmailValid, setIsEmailValid] = React.useState(true);
  const [isUsernameValid, setIsUsernameValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = React.useState(true);
  const [isEmailRegistered, setIsEmailRegistered] = React.useState(false);
  const [isUsernameTaken, setIsUsernameTaken] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = React.useState(false);

  const register = async () => {
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
          setIsWarningDialogOpen(true);
        }
      } else {
        setIsWarningDialogOpen(true);
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
      register().then();
    }
  }

  return (
    <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
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
        <Box display="flex" justifyContent="flex-end" alignItems="center" sx={{ paddingTop: "1rem" }}>
          <Box display={isSuccess ? "block" : "none"} sx={{ marginRight: "1rem" }}>
            <DoneIcon color="success"/>
          </Box>
          <Button
            variant="contained" size="large" disableElevation
            disabled={isLoading}
            onClick={handleOnClick}
          >
            注册
          </Button>
        </Box>
      </Box>
      <Dialog
        open={isWarningDialogOpen}
        onClose={() => setIsWarningDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ ".MuiPaper-root": { borderRadius: "1rem" } }}
      >
        <DialogTitle id="alert-dialog-title">
          出现了未知错误
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            服务可能不可用，请稍后再试。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsWarningDialogOpen(false)} autoFocus>
            确认
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
