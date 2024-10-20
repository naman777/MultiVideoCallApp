import { WebSocketServer } from 'ws';
import { RoomManager } from './classes/roomManager';

const PORT = process.env.PORT || 8080;  

const wss = new WebSocketServer({ port: Number(PORT) });

const roomManager = new RoomManager();

wss.on('connection', function connection(ws) {

    ws.on('error', console.error);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
        let message = JSON.parse(data.toString());
        message = {
            ...message,
            socket: ws
        }
        roomManager.handleMessages(message);
    });

    ws.send('socket connetion made');

    ws.on('close', function close() {
        console.log('disconnected');
    });
});

console.log('Server started on port 8080');