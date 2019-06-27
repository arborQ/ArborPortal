using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Requests.Queue;
using MediatR;
using RabbitMQ.Client;

namespace QueueStorage.Handlers
{
    internal abstract class PublishQueueItemHandler<T> : INotificationHandler<PublishQueueItem<T>>
    {
        private readonly string queueName;

        protected PublishQueueItemHandler(string queueName)
        {
            this.queueName = queueName;
        }
        public Task Handle(PublishQueueItem<T> notification, CancellationToken cancellationToken)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(
                                queue: queueName,
                                durable: false,
                                exclusive: false,
                                autoDelete: false,
                                arguments: null);

                    string message = "Hello World!";
                    var body = Encoding.UTF8.GetBytes(

                    channel.BasicPublish(exchange: "",
                                         routingKey: "hello",
                                         basicProperties: null,
                                         body: body);

                    Console.WriteLine(" [x] Sent {0}", message);
                }
            }

            return Task.CompletedTask;
        }
    }
}
