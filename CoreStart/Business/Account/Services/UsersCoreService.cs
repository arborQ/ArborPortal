using Account.Dtos;
using Data.Entity.Models.Account;
using Structure.Business.Account.Models;
using Structure.Business.Account.Services;
using Structure.Services;
using System;
using System.Linq.Expressions;

namespace Account.Services
{
    internal class UsersCoreService : BaseCoreService<IUser, User>, IUsersCoreService
    {
        public UsersCoreService(AccountUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        protected override IUser MapFromEntity(User entity)
        {
            return new UserDto
            {
                Id = entity.Id,
                Email = entity.Email,
                FullName = entity.FullName,
                Login = entity.Login,
                FirstName = entity.FirstName,
                LastName = entity.LastName,
                IsActive = entity.IsActive,
            };
        }

        protected override Func<User, User> MapFromInterface(IUser contract)
        {
            return user => {
                user.Login = contract.Login;
                user.FirstName = contract.FirstName;
                user.LastName = contract.LastName;
                user.Email = contract.Email;
                user.IsActive = contract.IsActive;

                return user;
            };
        }
    }
}
