using System;
using System.Threading.Tasks;

namespace ExternalUsersEvents
{
    public interface IEventHandler
    {
        string QueueName { get; }

        Type EventType { get; }

        Task HandleEvent(object message);
    }
}
