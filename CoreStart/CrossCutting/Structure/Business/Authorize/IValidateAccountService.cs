using Structure.Models;
using System.Threading.Tasks;

namespace CrossCutting.Structure.Business.Authorize
{
    public interface IValidateAccountService {
        Task<ICurrentUser> IsAccoutValid (string login, string password);
    }
}