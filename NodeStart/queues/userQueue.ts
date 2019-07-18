import { connect } from 'amqplib/callback_api';
import { queue_url } from '../config';

const queue_name: string = 'core_user_channel';

export default function (userData: any): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        connect(queue_url, (error, connection) => {
            connection.createChannel((error, channel) => {
                channel.assertQueue(queue_name, {
                    durable: false
                });

                console.log("[*] Waiting for messages in %s. To exit press CTRL+C", queue_name);
                channel.sendToQueue(queue_name, Buffer.from(JSON.stringify(userData)));

                resolve();
            })
        });

    });
}
