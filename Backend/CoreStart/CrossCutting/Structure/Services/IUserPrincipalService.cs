using CoreStart.CrossCutting.Structure.Models;

namespace CoreStart.CrossCutting.Structure.Services
{
    public interface IUserPrincipalService
    {
        bool IsAuthorized { get; }

        ICurrentUser User { get; }
    }
}
