using Structure.Models;

namespace Structure.Services
{
    public interface IUserPrincipalService
    {
        bool IsAuthorized { get; }

        ICurrentUser User { get; }
    }
}
