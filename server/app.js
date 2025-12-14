import express from 'express';
import { Server } from "socket.io"; // Imp Import
import { createServer } from 'http'; // Imp Import

const app = express();
const server = createServer(app); // Imp Import

const io = new Server(server);


app.get('/' , (req,res) => {
    res.send('Server is Running...');
});

// Socket.IO
io.on( 'connection' , ()=> {
    console.log(`User Connected with socket id ${socket.id}`);
} )

const port = 3000;
app.listen( port, () => {
    console.log(`Server is Running on Port ${port}`);
});