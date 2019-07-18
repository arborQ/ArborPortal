import { createServer } from 'http';
import io from 'socket.io';
import { port } from './config'
const server = createServer();

const socket = io(server);

let counter = 0;
setInterval(() => {
    socket.emit('new_user', new Date().toDateString() + (counter++).toString());
}, 1000);

server.listen(port, () => {
    console.log(`lisen io: *:${port}`);
})