import mongoose from 'mongoose';
import { Server } from 'socket.io';
import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import cookieSession from 'cookie-session';
import { handleSocket } from './routes/web-socket';
import { userRouter } from './routes/user';
import { editorRoute } from './routes/docs';

const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'dev',
}));

app.use(userRouter);
app.use(editorRoute);

app.all('*', (req: Request, res: Response) => {
    res.status(404).send({ message: 'Not Found' });
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', handleSocket);

const start = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('Mongo url is required');
        }
        await mongoose.connect(process.env.MONGO_URI);

        server.listen(3001, () => {
            console.log('listening on port 3001');
        });
    } catch(err) {
        console.log('failed to start server', err);
    }
}

start();