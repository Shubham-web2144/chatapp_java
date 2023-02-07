import { Alert, Box, Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
import '../App.css';
import {useFormik} from 'formik';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if(!values.username) {
      errors.username = "Username required!!!";
    }
    if(!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email required or email format is wrong";
    }
    if(!values.gender) {
      errors.gender = "Gender is required!!!";
    }
    // if(!errors.password) {
    //   errors.password = "Password required!!!";
    // }
    return errors;
  }

    const formik = useFormik({
        initialValues: {
            username : '',
            email : '',
            gender: '',
            password: ''
        },
        validate,
        onSubmit: (values) => {
          axios.post("http://localhost:7070/createUser",values).then((res) => {
            if(res.status === 201) {
              setUser(true);
              navigate("/profile");
              console.log(res);
              sessionStorage.setItem("user", res.data.userId);
            }
          });
        }
    })

  return (
    <div className="createAccount">
      <Box>
        <Typography variant="h4" sx={{ margin: "25px 0px", color: "rgb(43, 68, 209)", fontWeight: "600" }}>Create New Account</Typography>
      </Box>
      <form method="post" onSubmit={formik.handleSubmit}>
      <Box sx={{ width: "500px" }}  >
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
          sx={{ margin: "10px 0px"}}
        />
       {
        formik.errors.username ?  <Alert severity="error">{formik.errors.username}</Alert> : <span></span>
       }
        <TextField
        //   id="outlined-textarea"
          label="Email"
          name="email"
          placeholder="Enter Your Email"
          multiline
          fullWidth={true}
          sx={{ margin: "10px 0px"}}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {
        formik.errors.email ?  <Alert severity="error">{formik.errors.email}</Alert> : <span></span>
       }
        <TextField
        //   id="outlined-textarea"
          label="Gender"
          name="gender"
          placeholder="Enter Your Gender"
          multiline
          fullWidth={true}
          sx={{ margin: "10px 0px"}}
          value={formik.values.gender}
          onChange={formik.handleChange}
        />
        {
        formik.errors.gender ?  <Alert severity="error">{formik.errors.gender}</Alert> : <span></span>
       }
        <TextField
          id="outlined-password-input"
          label="Password"
          name="password"
          type="password"
          fullWidth={true}
          sx={{ margin: "10px 0px"}}
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {/* {
        formik.errors.password ?  <Alert severity="error">{formik.errors.password}</Alert> : <span></span>
       } */}
        <Button type="submit" color="success" sx={{ margin: "10px 0px" }} fullWidth={true} variant="contained">Create Account</Button>
        <Divider>  OR &nbsp;</Divider>
        <Button color="primary" sx={{ margin: "10px 0px" }} fullWidth={true} variant="contained">
          <Link to={"/login"} className="link">Log In</Link>
        </Button>
      </Box>
      </form>
    </div>
  );
};

export default CreateAccount;
