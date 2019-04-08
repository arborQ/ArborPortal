using MediatR;

namespace CoreStart.CrossCutting.Structure.Models
{
    public interface ICurrentUser : IRequest<string>
    {
        long Id { get; }

        string Login { get; }

        string Email { get; }
    }
}
