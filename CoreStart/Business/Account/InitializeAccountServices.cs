using System.Collections.Generic;
using Account.Services;
using CoreStart.Business.Account.Handlers.Users;
using CoreStart.Business.Account.Services;
using CoreStart.Business.Account.Validators;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Handlers;
using CoreStart.CrossCutting.Structure.IoC;
using FluentValidation;

namespace CoreStart.Business.Account.Account
{
    public static class InitializeAccountServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield return ContainerRegister.Service<UsersCoreService, IUsersCoreService>();
            yield return ContainerRegister.UnitOfWork<AccountUnitOfWork>();
            yield return ContainerRegister.Service<UserValidator, IValidator<IUser>>();
        }
    }
}
