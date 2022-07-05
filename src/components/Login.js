import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const axios = require("axios");

const theme = createTheme();

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        username: credentials.username,
        password: credentials.password,
      };
      const options = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post(
        "http://localhost:8080/foodbank/auth/login",
        body,
        options
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } else {
        alert("Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={credentials.username}
              autoComplete="given-name"
              name="username"
              required
              fullWidth
              onChange={onChange}
              id="username"
              label="User Name"
              autoFocus
              minLength={5}
            />
            <TextField
              margin="normal"
              required
              value={credentials.password}
              fullWidth
              onChange={onChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              minLength={5}
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
    </ThemeProvider>
  );
}
