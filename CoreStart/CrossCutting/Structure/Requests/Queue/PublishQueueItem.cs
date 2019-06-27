using MediatR;

namespace CoreStart.CrossCutting.Structure.Requests.Queue
{
    public class PublishQueueItem<T> : INotification
    {
        public T PublishItem { get; set; }
    }
}
