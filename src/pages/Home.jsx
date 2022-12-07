import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 8,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Greetings From Muhammad Waleed
      </Typography>
      <Typography variant="body1" component="h5" gutterBottom>
        waleedmirza667@gmail.com
      </Typography>

      <Button color="success" variant="contained">
        <Link to="/login">Login</Link>
      </Button>
    </Box>
  );
};

export default Home;
