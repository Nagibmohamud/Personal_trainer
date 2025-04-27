import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import TrainingList from "./components/TrainingList";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function App() {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>Training</Box>
          <Button color="inherit" component={Link} to="/">
            Training
          </Button>
          <Button color="inherit" component={Link} to="/customers">
            Customers
          </Button>
        </Toolbar>
      </AppBar>
      <TrainingList />
      <CssBaseline />
    </Container>
  );
}

export default App;
