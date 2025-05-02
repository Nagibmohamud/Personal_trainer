import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Schedule from "./components/Schedule";
import { Box, Button, Link } from "@mui/material";

function Calendar() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Calendar</Box>
          <Button color="inherit" component={Link} href="/">
            Training
          </Button>
          <Button color="inherit" component={Link} href="/customers">
            Customers
          </Button>
          <Button color="inherit" component={Link} href="/calendar">
            Calendar
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Schedule />
      </Container>
    </>
  );
}

export default Calendar;
