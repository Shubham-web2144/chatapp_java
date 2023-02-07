import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
    //https://static.vecteezy.com/system/resources/previews/003/557/257/original/abstract-blue-and-gray-wave-background-free-vector.jpg
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage:
            "url('https://t3.ftcdn.net/jpg/03/27/46/14/360_F_327461491_FWBhMuNNJLZQe1vXboG8eMu8uHGGZ2jf.jpg')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }}
      >
        <Box sx={{ width: "100%", height: "100vh", padding: "28px 0px" }}>
          <Typography variant="h4" mt={10}>
            Let's chat with your <strong>Nearby...</strong>
          </Typography>
          <Typography variant="subtitle1" mt={3} paragraph={true}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            <Button
              color="primary"
              variant="contained"
              sx={{ marginRight: "10px" }}
            >
             <Link to={"/create"} className="link"> Create An Account</Link>
            </Button>
            <Button color="success" variant="outlined">
             <Link to={"/login"} className="link"> Log in To Chat App</Link>
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
