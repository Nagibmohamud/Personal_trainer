import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

export default function EditCustomer(props) {
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
    console.log("open", props.customer);
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone,
      links: props.customer._links,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateCustomer = (event) => {
    event.preventDefault();
    props.updateCustomer(customer, props.link);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={updateCustomer}>
          <DialogTitle>Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
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
              name="city"
              value={customer.city}
              onChange={(e) =>
                setCustomer({ ...customer, city: e.target.value })
              }
              label="City"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              name="email"
              value={customer.email}
              onChange={(e) =>
                setCustomer({ ...customer, email: e.target.value })
              }
              label="Email"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
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
            <Button type="submit">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
