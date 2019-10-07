import { connect } from 'amqplib/callback_api';
import config from '../src/config/config.service';

function connectToQueue(queueName: string, onMessage: (message: string) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        connect(config.queueUrl, (error, connection) => {
            console.log({error});
            connection.createChannel((channelError, channel) => {
            console.log({channelError});
            channel.assertQueue(queueName, { durable: true });

            channel.consume(queueName, (msg) => {
                    console.log(' [x] Received %s', msg.content.toString());
                    onMessage(msg.content.toString());
                }, {
                    noAck: true,
                });
            });
        });
    });
}

console.log('queue start');
connectToQueue('queue_recipes', data => {
    console.log(data);
}).then(() => {
    console.log('queue created');
});
