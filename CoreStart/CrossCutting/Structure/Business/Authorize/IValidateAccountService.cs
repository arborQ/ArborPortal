using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Models;

namespace CoreStart.CrossCutting.Structure.Business.Authorize
{
    public interface IValidateAccountService {
        Task<ICurrentUser> IsAccoutValid (string login, string password);
    }
}