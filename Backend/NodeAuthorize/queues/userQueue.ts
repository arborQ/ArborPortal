import { connect } from 'amqplib/callback_api';
import { queue_url } from '../config';
const queue_name: string = 'core_user_channel';

export default function (userData: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        connect('localhost', (error, connection) => {
            if (!!error) {
                console.log(error);
            }
            connection.createChannel((error, channel) => {
                if (!!error) {
                    console.log(error);
                }

                channel.assertQueue(queue_name, {
                    exclusive: false,
                    autoDelete: false,
                    durable: false
                }, (err, ok) => {
                    channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(userData)));
                    console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue_name);

                    resolve();
                });
            })
        });

    });
}

