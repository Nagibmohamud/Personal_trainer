import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTraining = () => {
    props.saveTraining(training);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        style={{ margin: 10 }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="datetime-local"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setTraining({ ...training, date: event.target.value });
            }}
          />
          <TextField
            margin="dense"
            id="duration"
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setTraining({
                ...training,
                duration: event.target.value,
              });
            }}
          />
          <TextField
            margin="dense"
            id="activity"
            label="Activity"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setTraining({
                ...training,
                activity: event.target.value,
              });
            }}
          />
          <TextField
            select
            margin="dense"
            id="customer"
            label="Customer"
            fullWidth
            variant="standard"
            value={training.customer}
            onChange={(event) => {
              setTraining({
                ...training,
                customer: event.target.value,
              });
            }}
          >
            {props.customers.map((customer) => (
              <MenuItem key={customer.id} value={customer._links.self.href}>
                {customer.firstname} {customer.lastname}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
