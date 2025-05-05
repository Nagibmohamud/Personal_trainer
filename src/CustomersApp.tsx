import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import CustomerList from "./components/CustomerList";
import { Box, Button, Link } from "@mui/material";

function Customers() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Customers</Box>
          <Button color="inherit" component={Link} href="/">
            Training
          </Button>
          <Button color="inherit" component={Link} href="/customers">
            Customers
          </Button>
          <Button color="inherit" component={Link} href="/calendar">
            Calendar
          </Button>
          <Button color="inherit" component={Link} href="/stats">
            Stats
          </Button>
        </Toolbar>
      </AppBar>
      <CustomerList />
      <CssBaseline />
    </Container>
  );
}

export default Customers;
