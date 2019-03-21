using System.Collections.Generic;
using Account.Services;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using CoreStart.CrossCutting.Structure.IoC;

namespace CoreStart.Business.Account.Account
{
    public static class InitializeServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield return ContainerRegister.Service<UsersCoreService, IUsersCoreService>();
            yield return ContainerRegister.UnitOfWork<AccountUnitOfWork>();
        }
    }
}
