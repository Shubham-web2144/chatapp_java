import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "../App.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isError, serIsError] = useState(false);
  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username required!!!";
    }
    if (
      !values.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email required or email format is wrong";
    }
    if (!values.gender) {
      errors.gender = "Gender is required!!!";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
      const response = await axios
        .put(`http://localhost:7070/edit/${sessionStorage.getItem("user")}`, {
          username: values.username,
          email: values.email,
          gender: values.gender,
          password: values.password,
        })
        .catch((err) => console.log(err));

      if (response.data === "success") {
        navigate("/profile");
      } else {
        serIsError(true);
      }
    },
  });
  return (
    <div className="createAccount">
      {isError ? (
        <Alert variant="filled" severity="error">
          This is an error alert — check it out!
        </Alert>
      ) : (
        <></>
      )}
      <Box>
        <Typography
          variant="h4"
          sx={{
            margin: "25px 0px",
            color: "rgb(43, 68, 209)",
            fontWeight: "600",
          }}
        >
          Update Profile Details
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
            //   id="outlined-textarea"
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            multiline
            fullWidth={true}
            sx={{ margin: "10px 0px" }}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <Alert severity="error">{formik.errors.email}</Alert>
          ) : (
            <span></span>
          )}
          <TextField
            //   id="outlined-textarea"
            label="Gender"
            name="gender"
            placeholder="Enter Your Gender"
            multiline
            fullWidth={true}
            sx={{ margin: "10px 0px" }}
            value={formik.values.gender}
            onChange={formik.handleChange}
          />
          {formik.errors.gender ? (
            <Alert severity="error">{formik.errors.gender}</Alert>
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
            Update Details
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditProfile;
