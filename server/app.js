import express from 'express';
const app = express();
import { Server } from "socket.io";

app.get('/' , (req,res) => {
    res.send('Server is Running...');
});

const port = 3000;
app.listen( port, () => {
    console.log(`Server is Running on Port ${port}`);
});