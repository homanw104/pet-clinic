import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginCardLayout from "@/components/layout/login_card_layout";
import Link from "next/link";

export default function Login() {
  return (
    <LoginCardLayout>
      <Typography variant="h3">登录</Typography>
      <TextField
        id="username" label="用户名" variant="outlined"
        type="text"
      />
      <TextField
        id="password" label="密码" variant="outlined"
        type="password"
      />
      <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        <Button>忘记密码？</Button>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <Link href="/sign-up">
            <Button variant="outlined">注册</Button>
          </Link>
          <Link href="/" >
            <Button variant="contained"disableElevation>登录</Button>
          </Link>
        </Stack>
      </Stack>
    </LoginCardLayout>
  )
}
