using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Services;

namespace CoreStart.Data.Entity.Models.Account
{
    internal class CreateUserMappingService : IMapperService<IUser, User>
    {
        public Task<User> Map(IUser model)
        {
            return new Task<User>(() => new User
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Email = model.Email,
                Login = model.Login,
                IsActive = model.IsActive,
                DeletedAt = null
            });
        }
    }
}
