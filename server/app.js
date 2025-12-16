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
    console.log(`User Connected -- socket id - ${socket.id}`);

    // Event : message listener from frontend user (socket)
    socket.on( 'message', ({room, message}) => {
        console.log({room, message});

        // This event emit the data(roomId & msg) of "message" event
        socket.to(room).emit( 'receive-message', message );
    });

    // Event : Join Room
    socket.on( "join-room", (room) => {
        socket.join(room);
        console.log(`User Joined room ${room}`);
    });

    // Event : disconnect
    socket.on( 'disconnect', () => {
        console.log( 'User Disconnected -- socket id - ', socket.id );
    } )
    
})

const port = 3000;

// server.listen = It doesn't create new Instance
server.listen( port, () => {
    console.log(`Server is Running on Port ${port}`);
});