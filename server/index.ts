import mongoose from 'mongoose';
import { Server } from 'socket.io';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { handleSocket } from './routes/web-socket';


mongoose.connect('mongodb://localhost/google-docs');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}))
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', handleSocket);


server.listen(3001, () => {
    console.log('listening on port 3001');
});
