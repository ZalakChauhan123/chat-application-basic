import express from 'express';
import { Server } from "socket.io"; // Imp Import
import { createServer } from 'http'; // Imp Import

const app = express();
const server = createServer(app); // Imp Import

const io = new Server(server, {
    cors : {
        origin : 'http://localhost:5173',
        methods : [ 'GET', 'POST' ],
        credentials : true,

    }
});


app.get('/' , (req,res) => {
    res.send('Server is Running...');
});

// Socket.IO
io.on( 'connection' , (socket)=> {
    console.log(`User Connected with socket id - ${socket.id}`);
} )

const port = 3000;

// server.listen = It doesn't create new Instance
server.listen( port, () => {
    console.log(`Server is Running on Port ${port}`);
});