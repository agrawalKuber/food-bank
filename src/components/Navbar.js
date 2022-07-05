import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Button,
  Link,
  Typography,
} from "@mui/material";
import { FoodBank } from "@mui/icons-material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const axios = require("axios");

const Navbar = () => {
  let location = useLocation();
  useEffect(() => {}, [location]);
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      localStorage.removeItem("token");
      await axios.get("http://localhost:8080/foodbank/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton href="/" size="large" edge="start" color="inherit">
          <FoodBank />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" color="inherit" underline="none">
            FoodBank
          </Link>
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button href="/campaigns" color="inherit">
            Campaigns
          </Button>
          <IconButton href="/CartScreen" color="inherit">
            <ShoppingCartIcon />
          </IconButton>

          {!localStorage.getItem("token") ? (
            <>
              <Button href="/signup" color="inherit">
                SignUp
              </Button>
              <Button href="/login" color="inherit">
                <LoginIcon />
              </Button>
            </>
          ) : (
            <IconButton
              onClick={() => {
                Logout();
              }}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
