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
import DoneIcon from "@mui/icons-material/Done";

export default function PageContent() {
  const router = useRouter();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [isIdentifierValid, setIsIdentifierValid] = React.useState(true);
  const [isPasswordValid, setIsPasswordValid] = React.useState(true);
  const [isIdentifierNotFound, setIsIdentifierNotFound] = React.useState(false);
  const [isPasswordIncorrect, setIsPasswordNotMatch] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isWarningDialogOpen, setIsWarningDialogOpen] = React.useState(false);

  const login = async () => {
    try {
      await axios.post(`${API_URL}/login`, {
        "identifier": identifier,
        "password": password
      });
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
          setIsWarningDialogOpen(true);
        }
      } else {
        setIsWarningDialogOpen(true);
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
      login().then();
    }
  }

  return (
    <Stack spacing={4} direction="column" justifyContent="center" alignItems="stretch" margin="2rem">
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
