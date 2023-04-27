import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface DialogProps {
  isActive: boolean;
  title: string;
  text: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({ isActive, title, text, onCancel, onConfirm }: DialogProps) {
  return (
    <Dialog
      open={isActive}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>取消</Button>
        <Button onClick={onConfirm} autoFocus>确定</Button>
      </DialogActions>
    </Dialog>
  )
}
