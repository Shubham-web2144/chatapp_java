import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import ForumIcon from "@mui/icons-material/Forum";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../app/users/userSlice";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const NavBar = () => {
  let userID = parseInt(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const select = useSelector((state) => state.user.user);
  console.warn(select);
  const [anchorEl, setAnchorEl] = useState(null);
  const title = "CHaT APPLiCATiON";
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

console.log(sessionStorage.getItem("user"));

const handleLogOut = async () => {
  let userid = parseInt(sessionStorage.getItem("user"));
    const response = await axios
      .post(`http://localhost:7070/logOut/${userid}`)
      .catch((err) => console.warn(err));
    console.log(response);
    if (response.data === "success") {
      sessionStorage.removeItem("user");
      navigate("/");
    }
}

  useEffect(() => {
      dispatch(fetchUserData(parseInt(sessionStorage.getItem("user"))));
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Toolbar disableGutters>
            <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {title}
            </Typography>
          </Toolbar>
          {sessionStorage.getItem("user") !== null ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>{ select.username }</MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </AppBar>
    </div>
  );
};

export default NavBar;
