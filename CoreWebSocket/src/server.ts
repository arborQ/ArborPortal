import { createServer } from 'http';
import io from 'socket.io';
import { app_port, queue_url } from './config'
import { connect } from 'amqplib/callback_api';
const server = createServer();

const socket = io(server);

connect(queue_url, (error, connection) => {
    console.log(error);
    connection.createChannel((error, channel) => {
        console.log(error);
        channel.assertQueue('core_user_channel', {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", 'core_user_channel');
        channel.consume('core_user_channel', function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            socket.emit('core_user_channel', msg.content.toString());
        }, {
                noAck: true
            });
    });
});

server.listen(app_port, () => {
    console.log(`lisen io: *:${app_port}`);
})