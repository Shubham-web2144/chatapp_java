import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Button,
  ListItemAvatar,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { useFormik } from "formik";
import ChatIcon from "@mui/icons-material/Chat";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

// chat area page***
const ChatArea = () => {
  const [users, setUsers] = useState([]); // all users list
  const [messages, setMessages] = useState([]); // messages list
  const { userID } = useParams(); // selected user id

  const listRef = (useRef < HTMLUListElement) | (null > null);

  // formik  instrance
  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const response = await axios
        .post(
          `http://localhost:7070/send/${sessionStorage.getItem(
            "user"
          )}/${userID}`,
          values.message,
          {
            headers: {
              "Content-type": "application/text",
            },
          }
        )
        .catch((err) => console.warn(err));

      console.log(response.status);
      if (response.status === 200) {
        listRef.current?.scrollIntoView();
      }
      resetForm(values);
    },
  });

  // getting all users data
  const fetchAllUsers = async () => {
    const response = await axios
      .get(`http://localhost:7070/getAllUser`)
      .catch((err) => console.warn(err));
    setUsers(response.data);
  };

  // getting messages
  const fetchMessages = async (sender, reciver) => {
    if (reciver !== undefined) {
      const response = await axios
        .get(`http://localhost:7070/getMesgs/${sender}/${reciver}`)
        .catch((err) => console.log(err));
      setMessages(response.data);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchMessages(sessionStorage.getItem("user"), userID);
  }, [userID, sessionStorage.getItem("user"), messages, users]);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          background: "",
          display: "flex",
        }}
      >
        <Box
          sx={{
            background: "white",
            flex: "0.3",
            borderRight: "1px solid #ccc",
          }}
        >
          <Box
            sx={{
              background: "",
              padding: "14px 0px",
              borderBottom: "1px solid #ccc",
              boxShadow: "1px 1px rgba(0,0,0,0.7)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to={"/profile"}>
              <ArrowCircleLeftIcon
                sx={{ fontSize: "35px", color: "blue", margin: "0px 10px" }}
              />
            </Link>
            <Typography
              variant="h6"
              sx={{ color: "rgb(41, 79, 202)", marginLeft: "10px" }}
            >
              Active Users
            </Typography>
          </Box>
          <List
            className="scrool"
            sx={{
              width: "100%",
              height: "500px",
              //   maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflowY: "scroll",
              scrollBehavior: "smooth",
              //   maxHeight: 800,
              "& ul": { padding: 0 },
            }}
          >
            {users.length === 1 ? (
              <span>No Users</span>
            ) : (
              users.map((user) => {
                if (user.userId === parseInt(sessionStorage.getItem("user"))) {
                } else {
                  return (
                    <Link
                      to={`/chat/${user.userId}`}
                      className="link"
                      key={user.userId}
                    >
                      <ListItem
                        divider={true}
                        selected={
                          user.userId === parseInt(userID) ? true : false
                        }
                      >
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText>{user.username}</ListItemText>
                        {user.active ? (
                          <>
                            <FiberManualRecordIcon
                              sx={{ color: "rgb(32, 241, 32)" }}
                            />
                          </>
                        ) : (
                          <>
                            <FiberManualRecordIcon sx={{ color: "gray" }} />
                          </>
                        )}
                      </ListItem>
                    </Link>
                  );
                }
              })
            )}
          </List>
        </Box>
        <Box
          sx={{
            background: "",
            flex: "0.7",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              flex: "0.7",
              background: "",
              textAlign: "left",
              overflow: "auto",
              scrollBehavior: "smooth",
            }}
          >
            {userID !== undefined ? (
              messages.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "190px",
                  }}
                >
                  <Typography
                    align="center"
                    variant="h5"
                    color="rgb(45, 97, 209)"
                  >
                    No Message Available
                  </Typography>{" "}
                  <Typography align="center" variant="p">
                    You never chat with this person
                  </Typography>
                </Box>
              ) : (
                messages.map((message) => (
                  <div
                    className={
                      message.reciverID === parseInt(userID)
                        ? "msgBox reciver"
                        : "msgBox sender"
                    }
                  >
                    <span>{message.message}</span>
                  </div>
                ))
              )
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  marginTop: "150px",
                }}
              >
                <ChatIcon
                  sx={{
                    width: "80px",
                    height: "80px",
                    textAlign: "center",
                    color: "rgb(45, 97, 209)",
                  }}
                />{" "}
                <Typography
                  align="center"
                  variant="h5"
                  color="rgb(45, 97, 209)"
                >
                  Select User To Chat
                </Typography>{" "}
                <Typography align="center" variant="p">
                  Click on any user to view there message.
                </Typography>
              </Box>
            )}
            {/* <div className="msgBox sender">
              <span>This is msg</span>
            </div>
            <div className="msgBox reciver">
              <span>This is msg</span>
            </div> */}
          </Box>
          <Box
            component={"form"}
            onSubmit={formik.handleSubmit}
            sx={{
              flex: "0.2",
              background: "white",
              boxShadow: "-2px 3px 10px rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <TextField
              type={"text"}
              name="message"
              sx={{
                flex: "0.9",
                marginRight: "10px",
                marginTop: "20px",
                marginLeft: "10px",
              }}
              onChange={formik.handleChange}
              placeholder="Type Message here..."
            />
            {/* <input
              type="text"
              name="sender"
              value={formik.values.sender}
              value={sessionStorage.getItem("user")}
              hidden
            />
            <input type="text" name="reciver"  value={userID} hidden /> */}
            <Button
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
              color="primary"
              sx={{ marginTop: "21px", height: "50px" }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ChatArea;
