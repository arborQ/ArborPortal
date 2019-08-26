using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public QueueConnection(IEnumerable<IEventHandler> handlers, ILogger<QueueConnection> logger)
        {
            _handlers = handlers.ToArray();
            _logger = logger;
        }

        public void Connect()
        {
            var factory = new ConnectionFactory() { HostName = "localhost", Port = 5672, UserName = "rabbitmq", Password = "rabbitmq" };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    var queues = _handlers.GroupBy(h => new { h.QueueName, h.EventType });

                    foreach (var queueName in queues)
                    {
                        channel.QueueDeclare(queue: queueName.Key.QueueName,
                                    durable: false,
                                    exclusive: false,
                                    autoDelete: false,
                                    arguments: null);

                        var consumer = new EventingBasicConsumer(channel);

                        consumer.Received += async (model, ea) =>
                        {
                            var body = ea.Body;
                            var message = Encoding.UTF8.GetString(body);
                            _logger.LogTrace($"{nameof(QueueConnection)} [{queueName.Count()}] Received {message}");
                            var eventObject = JsonConvert.DeserializeObject(message, queueName.Key.EventType);

                            foreach (var handler in queueName)
                            {
                                await handler.HandleEvent(eventObject);
                            }

                            channel.BasicConsume(queue: queueName.Key.QueueName,
                                 autoAck: true,
                                 consumer: consumer);
                        };
                    }

                    Console.WriteLine("Press [enter] to exit");
                    Console.ReadLine();
                }
            }
            Console.WriteLine("Exit");
        }
    }
}
