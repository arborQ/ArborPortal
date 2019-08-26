using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ExternalUsersEvents.EventObject;

namespace ExternalUsersEvents.EventHandlers
{
    public class CreateUserEventHandler : IEventHandler
    {
        public string QueueName => "core_user_channel"; // TODO: move to settings

        public Type EventType => typeof(CreateUserEventObject);

        public Task HandleEvent(object message)
        {
            throw new NotImplementedException();
        }
    }
}
