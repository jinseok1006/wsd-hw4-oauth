import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useDialogStore from "../store/useDialogStore";
import { useShallow } from "zustand/react/shallow";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  desc: string;
}

export default function SimpleDialog() {
  const [isDialogOpen, dialogTitle, dialogDesc, closeDialog] = useDialogStore(
    useShallow((state) => [state.isOpen, state.title, state.desc, state.close])
  );

  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {dialogDesc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} variant="text" color="inherit">
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
