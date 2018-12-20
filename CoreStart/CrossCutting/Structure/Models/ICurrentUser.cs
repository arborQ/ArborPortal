using MediatR;

namespace Structure.Models
{
    public interface ICurrentUser : IRequest<string>
    {
        long Id { get; }

        string Login { get; }

        string FullName { get; }

        string Email { get; }

        string[] Roles { get; }
    }
}
