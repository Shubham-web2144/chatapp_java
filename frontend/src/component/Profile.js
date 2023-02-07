import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const fetchUserDetails = async (userId) => {
    const response = await axios
      .get(
        `http://localhost:7070/getUserById/${sessionStorage.getItem("user")}`
      )
      .catch((err) => console.log(err));
    setUser(response.data);
  };

  useEffect(() => {
    fetchUserDetails();
  }, [sessionStorage.getItem("user")]);

   const logOutUser = async () => {
    let userid = parseInt(sessionStorage.getItem("user"));
    const response = await axios
      .post(`http://localhost:7070/logOut/${userid}`)
      .catch((err) => console.warn(err));
    console.log(response);
    if (response.data === "success") {
      sessionStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          //   justifyContent: "center",
          flexDirection: "column",
          padding: "30px 10px 0px 0px",
          backgroundImage:
            "url('https://www.filepicker.io/api/file/u5frNNlBQDQbBX0nh9Mg')",
        }}
      >
        <Box
          sx={{
            background: "rgba(0,0,255,0.6)",
            color: "#fff",
            display: "flex",
            justifyConten: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 16px",
            borderRadius: "6px",
            marginTop: "20px",
            boxShadow: "0px 3px 10px rgba(0,0,0,0.9)",
          }}
        >
          <Avatar
            sx={{ width: "130px", height: "130px", margin: "10px 0px" }}
          />
          <Box sx={{ width: "400px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "8px 0px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography sx={{ marginLeft: "10px", width: "100px" }}>
                Username
              </Typography>
              <Typography
                variant="h6"
                sx={{ flex: "1", textAlign: "start", marginLeft: "10px" }}
              >
                {user.username}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "8px 0px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography sx={{ marginLeft: "10px", width: "100px" }}>
                Email
              </Typography>
              <Typography
                variant="h6"
                sx={{ flex: "1", textAlign: "start", marginLeft: "10px" }}
              >
                {user.email}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "8px 0px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography sx={{ marginLeft: "10px", width: "100px" }}>
                Gender
              </Typography>
              <Typography
                variant="h6"
                sx={{ flex: "1", textAlign: "start", marginLeft: "10px" }}
              >
                {user.gender}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "25px" }}>
            <Button
              color="primary"
              variant="contained"
              sx={{ margin: "0px 6px" }}
            >
              <Link to={"/chat"} className="link">
                Chat With Friends
              </Link>
            </Button>
            <Button
              color="success"
              variant="contained"
              sx={{ margin: "0px 6px" }}
            >
              <Link to={"/edit"} className="link">
                Edit Profile
              </Link>
            </Button>
            <Button
              color="warning"
              variant="contained"
              sx={{ margin: "0px 6px" }}
              onClick={logOutUser}
            >
              Log Out
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
