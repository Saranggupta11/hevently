import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import { mutate } from "swr";
import { LoadingButton } from "@mui/lab";

export default function AlertDialog({
  title,
  open,
  setOpen,
  type,
  uid,
  setAlertOpen,
  msg,
  accept
}) {
//   const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    const res = await deleteEvent(uid, type);
    setLoading(false);
    mutate(`/api/user/${user.uid}/event`);
    if (res) {
      setOpen(false);
      setAlertOpen(true);
    } else {
      console.log("Event not deleted");
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="poppins" id="alert-dialog-title">
          {"Cancel Event"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="poppins" id="alert-dialog-description">
            {msg}{" "}
            <b className="capitalize">{title}?</b>
          </DialogContentText>
        </DialogContent>
        <div className="flex justify-end gap-3 p-4">
          <Button
            sx={{
              ":hover": {
                backgroundColor: "rgb(244, 244, 245)",
              },
            }}
            onClick={handleClose}
          >
            <div className=" capitalize text-gray-500">Cancel</div>
          </Button>
          <LoadingButton
            variant="contained"
            onClick={handleDelete}
            loading={loading}
            color={accept?'success':'error'}
          >
            <div className="capitalize">Confirm</div>
          </LoadingButton>
        </div>
      </Dialog>
    </div>
  );
}
