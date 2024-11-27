import { useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useShallow } from "zustand/react/shallow";
import useSnackbarStore from "../store/useSnakbarStore";

export default function SimpleSnackBar() {
  const [isOpen, desc, close] = useSnackbarStore(
    useShallow((state) => [state.isOpen, state.desc, state.close])
  );


  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={close}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={close}
        severity="success"
        variant="filled"
        sx={{ width: "100%", color: "#fff" }}
      >
        {desc}
      </Alert>
    </Snackbar>
  );
}

{
  /* <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isOpen}
        autoHideDuration={1500}
        message={desc}
        // key={"bottomcenter"}
      /> */
}
