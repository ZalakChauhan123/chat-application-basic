import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const App = () => {

  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );


  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit( "message", message );
    setMessage("");
  };

  // How to Handle Events
  useEffect(() => {

      // is a built-in client-side event fired by the Socket.IO client when it successfully 
      // connects to the server. The client emits/handles it locally; 
      // the server doesn't need to create it.
      socket.on( 'connect' , () => {
        console.log( `Connected Socket Id ${socket.id}` );
      })

      // Event receive : Welcome
      socket.on( 'welcome', (message) => { console.log(message) } );

      // Event : disconnect
      return() => {
        socket.disconnect();
      }

  }, []);

  return (
    <Container maxWidth="sm">


      <Box sx={{ height: 500 }} />
      <Typography variant="h6" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>


      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />


        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

    </Container>
  )
};

export default App