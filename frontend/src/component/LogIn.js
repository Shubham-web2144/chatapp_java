import {
  Box,
  Typography,
  TextField,
  Alert,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import "../App.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const LogIn = () => {

  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username required!!!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const response = await axios
        .post(
          `http://localhost:7070/log?username=${values.username}&password=${values.password}`
        ).catch((err) => console.log(err));
        console.log(response.data);
        if(response.status === 200) {
          sessionStorage.setItem("user", response.data.userId);
          navigate("/profile");
        }
    },
  });

  return (
    <div className="createAccount">
      <Box>
        <Typography
          variant="h4"
          sx={{
            margin: "25px 0px",
            color: "rgb(43, 68, 209)",
            fontWeight: "600",
          }}
        >
          Log In
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ width: "500px" }}>
          <TextField
            id="outlined-input"
            label="Username"
            name="username"
            // placeholder="Enter Your Username"
            // multiline
            type={"text"}
            fullWidth={true}
            value={formik.values.username}
            onChange={formik.handleChange}
            sx={{ margin: "10px 0px" }}
          />
          {formik.errors.username ? (
            <Alert severity="error">{formik.errors.username}</Alert>
          ) : (
            <span></span>
          )}
          <TextField
            id="outlined-password-input"
            label="Password"
            name="password"
            type="password"
            fullWidth={true}
            sx={{ margin: "10px 0px" }}
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            color="success"
            sx={{ margin: "10px 0px" }}
            fullWidth={true}
            variant="contained"
          >
            Log In
          </Button>
          <Divider> OR &nbsp;</Divider>
          <Button
            color="primary"
            sx={{ margin: "10px 0px" }}
            fullWidth={true}
            variant="contained"
          >
            <Link to={"/create"} className="link">
              {" "}
              Create account
            </Link>
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LogIn;
