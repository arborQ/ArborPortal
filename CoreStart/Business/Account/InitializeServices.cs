using Account.Services;
using CrossCutting.Structure.IoC;
using Structure.Business.Account.Services;
using System.Collections.Generic;

namespace Business.Account
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
