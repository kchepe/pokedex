import { Snackbar } from "@material-ui/core";
import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

interface SnackBarProps {
  open: boolean;
  isClose: () => void;
  message: string;
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBarComponent = (props: SnackBarProps) => {
  return (
    <div>
      <Snackbar
        open={props.open}
        onClose={props.isClose}
        autoHideDuration={2000}
      >
        <Alert onClose={props.isClose} severity="success">
          Successfully {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SnackBarComponent;
