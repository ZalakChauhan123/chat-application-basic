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
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [messages, setMessages] = useState([]); // To Display messages on User display

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit( "message", {message, room} );
    setMessage("");
  };

  // How to Handle Events
  useEffect(() => {

      // is a built-in client-side event fired by the Socket.IO client when it successfully 
      // connects to the server. The client emits/handles it locally; 
      // the server doesn't need to create it.
      socket.on( 'connect' , () => {
        setSocketId(socket.id);
        console.log( `Connected Socket Id ${socket.id}` );
      });

      // Event receive : receive-message
      socket.on( 'receive-message' , ( msg ) => {
        console.log( msg );
        setMessages((messages) => [...messages, msg]);
      });

      // Event receive : Welcome
      socket.on( 'welcome', (message) => { console.log(message) } );

      // Event : disconnect
      return() => {
        socket.disconnect();
      }

  }, []);

  return (
    <Container maxWidth="sm">


      <Box/>
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
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

      <form onSubmit={handleSubmit}>

        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>

        <Stack>
        {messages.map((m, i) => (
          <Typography key={i} variant="h6" component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>

      </form>

    </Container>
  )
};

export default App