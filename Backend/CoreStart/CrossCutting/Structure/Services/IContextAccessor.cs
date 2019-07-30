using System.Security.Claims;
using System.Threading.Tasks;

namespace CoreStart.CrossCutting.Structure.Services
{
    public interface IContextAccessor
    {
        Task SignInAsync(ClaimsPrincipal principal, bool allowRefresh); 
    }
}
