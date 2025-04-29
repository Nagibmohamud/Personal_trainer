import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

export default function AddCustomer(props) {
  const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: "",
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addCustomer = () => {
    props.saveCustomer(customer);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        style={{ margin: 10 }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>New Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="firstname"
            value={customer.firstname}
            onChange={(e) =>
              setCustomer({ ...customer, firstname: e.target.value })
            }
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="lastname"
            value={customer.lastname}
            onChange={(e) =>
              setCustomer({ ...customer, lastname: e.target.value })
            }
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="streetaddress"
            value={customer.streetaddress}
            onChange={(e) =>
              setCustomer({ ...customer, streetaddress: e.target.value })
            }
            label="Street Address"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="postcode"
            value={customer.postcode}
            onChange={(e) =>
              setCustomer({ ...customer, postcode: e.target.value })
            }
            label="Postcode"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="city"
            value={customer.city}
            onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            label="City"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="email"
            value={customer.email}
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
            label="Email"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="name"
            name="phone"
            value={customer.phone}
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
            label="Phone"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addCustomer} type="submit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
