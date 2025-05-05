import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Box, Button, Link } from "@mui/material";
import Tilasto from "./components/Stats";

function Tilastot() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Stats</Box>
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
      <Container maxWidth="lg">
        <Tilasto />
      </Container>
    </>
  );
}

export default Tilastot;
