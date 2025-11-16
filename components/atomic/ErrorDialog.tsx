import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function ErrorDialog({ title, message, open, setOpen }: {
  title?: string;
  message?: string;
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ ".MuiPaper-root": { borderRadius: "1rem" } }}
    >
      <DialogTitle id="alert-dialog-title">
        {title ? title : "出现了未知错误"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message ? message : "服务可能不可用，请稍后再试。"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} autoFocus>
          {"确认"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
