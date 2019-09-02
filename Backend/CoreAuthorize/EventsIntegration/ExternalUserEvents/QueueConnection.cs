using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ExternalUsersEvents
{
    public class QueueConnection
    {
        private readonly IEventHandler[] _handlers;
        private readonly ILogger<QueueConnection> _logger;
        private const string QueueName = "new_user";

        public QueueConnection(IEnumerable<IEventHandler> handlers, ILogger<QueueConnection> logger)
        {
            _handlers = handlers.ToArray();
            _logger = logger;
        }

        private ConnectionFactory CreacteConnection()
        {
            return new ConnectionFactory() { HostName = "localhost", Port = 5672, UserName = "rabbitmq", Password = "rabbitmq" };
        }

        public async Task Publish(string message)
        {
            var factory = CreacteConnection();
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: QueueName,
                                durable: false,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

                    var body = Encoding.UTF8.GetBytes(message);

                    channel.BasicPublish(exchange: "",
                                         routingKey: QueueName,
                                         basicProperties: null,
                                         body: body);
                    Console.WriteLine(" [x] Sent {0}", message);
                }
            }

            await Console.Out.WriteLineAsync(" Press [enter] to exit.");
        }

        public async Task Connect(CancellationToken cancellationToken)
        {
            var factory = CreacteConnection();
            using (var connection = factory.CreateConnection())
            {
                var queues = _handlers.GroupBy(h => new { h.QueueName, h.EventType });
                foreach (var queueName in queues)
                {

                }

                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: QueueName,
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body);
                        Console.WriteLine(" [x] Received {0}", message);
                    };

                    channel.BasicConsume(queue: QueueName,
                                         autoAck: true,
                                         consumer: consumer);
                        //foreach (var queueName in queues)
                        //{
                        //    channel.QueueDeclare(queue: queueName.Key.QueueName,
                        //                durable: false,
                        //                exclusive: false,
                        //                autoDelete: false,
                        //                arguments: null);

                        //    var consumer = new EventingBasicConsumer(channel);

                        //    consumer.Received += async (model, ea) =>
                        //    {
                        //        var body = ea.Body;
                        //        var message = Encoding.UTF8.GetString(body);
                        //        Console.WriteLine($"[X] Recived message: '{message}'");

                        //        _logger.LogTrace($"{nameof(QueueConnection)} [{queueName.Count()}] Received {message}");
                        //        var eventObject = JsonConvert.DeserializeObject(message, queueName.Key.EventType);

                        //        foreach (var handler in queueName)
                        //        {
                        //            await handler.HandleEvent(eventObject);
                        //        }

                        //        channel.BasicConsume(queue: queueName.Key.QueueName,
                        //             autoAck: true,
                        //             consumer: consumer);
                        //    };
                        //}
                        await Console.Out.WriteLineAsync("Wait for cancellation");
                    WaitHandle.WaitAny(new[] { cancellationToken.WaitHandle });
                    await Console.Out.WriteLineAsync("Cancelled!");
                }
            }
        }
    }
}
