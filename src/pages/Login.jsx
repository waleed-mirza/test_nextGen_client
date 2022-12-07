import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Toast } from "../components/utility/NotifyInfo";
import axios from "axios";
import { REQ_URL } from "../constants";
import PropTypes from "prop-types";

const validateInputs = (data, setErrors) => {
  const email = data.get("email");
  const password = data.get("password");
  if (email.length < 3) {
    Toast("error", "Email should be atleast 3 characters long");
    setErrors((prev) => ({ ...prev, email: true }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, email: false }));
  }
  if (password.length < 3) {
    Toast("error", "Password should be atleast 3 characters long");
    setErrors((prev) => ({ ...prev, password: true }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, password: false }));
  }
  return true;
};

const Login = ({ setActiveUser }) => {
  const Navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isValid = validateInputs(data, setErrors);
    if (isValid) {
      axios
        .post(`${REQ_URL}/api/user/login`, data)
        .then((res) => {
          if (res.data.status === "ok") {
            Toast("success", "Login successful");
            setActiveUser(res.data.result);
            Navigate("/car-service");
          } else {
            Toast("error", res.data.message);
          }
        })
        .catch((err) => {
          Toast("error", err.message);
        });
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={errors.email}
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              error={errors.password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

Login.propTypes = {
  setActiveUser: PropTypes.func.isRequired,
};

export default Login;
