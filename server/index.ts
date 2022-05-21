import { Server } from 'socket.io';

const io = new Server(3000, {
    cors: {
        origin: 'https://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log('connected');
});