import { Button, Stack, TextField, Typography } from "@mui/material";
import LoginCardLayout from "@/components/layout/login_card_layout";
import Link from "next/link";

export default function SignUp() {
  return (
    <LoginCardLayout>
      <Typography variant="h3">注册</Typography>
      <TextField
        id="username" label="用户名" variant="outlined"
        type="default" autoComplete="username"
      />
      <TextField
        id="password" label="创建密码" variant="outlined"
        type="password" autoComplete="new-password"
      />
      <TextField
        id="password-repeat" label="重复密码" variant="outlined"
        type="password" autoComplete="new-password"
      />
      <Stack spacing={4} direction="row" justifyContent="space-between" style={{ paddingTop: "5rem" }}>
        <Link href="/login">
          <Button variant="outlined">返回</Button>
        </Link>
        <Link href="/">
          <Button variant="contained" href="/">注册</Button>
        </Link>
      </Stack>
    </LoginCardLayout>
  )
}
