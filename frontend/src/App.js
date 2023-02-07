import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateAccount from "./component/CreateAccount";
import Home from "./component/Home";
import NavBar from "./component/NavBar";
import { BrowserRouter as Router } from 'react-router-dom'
import LogIn from "./component/LogIn";
import Profile from "./component/Profile";
import EditProfile from "./component/EditProfile";
import ChatArea from "./component/ChatArea";


function App() {
  // const fetchUsers = () => {
  //  axios.get("http://localhost:7070/getAllUser").then((res) => console.log(res));
  // }

  // fetchUsers();


  return (
    <Router>
      <div className="App">
      <NavBar />
      {/* <Home /> */}
      {/* home page with two buttons log in and sign up */}
        {/* forms for login and register */}
      {/* profile ui interface */}
        {/* two buttons 1 chat 2 logout */}
      {/* chat ui -> user list in left side and in right side chat window */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateAccount/>} />
        <Route path="/login" element={<LogIn/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/chat/:userID" element={<ChatArea />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/chat" element={<ChatArea />}/>
      </Routes>
    </div>

    </Router>  
    );
}

export default App;
