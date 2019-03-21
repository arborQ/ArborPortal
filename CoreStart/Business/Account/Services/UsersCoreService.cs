using System;
using System.Linq.Expressions;
using CoreStart.Business.Account.Dtos;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.Data.Entity.Models.Account;

namespace Account.Services
{
    internal class UsersCoreService : BaseCoreService<IUser, User>, IUsersCoreService
    {
        public UsersCoreService(AccountUnitOfWork unitOfWork)
            : base(unitOfWork)
        {
        }

        protected override Expression<Func<User, bool>> FilterExpression()
        {
            return base.FilterExpression();
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
