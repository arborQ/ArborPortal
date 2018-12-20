using System.Collections.Generic;
using Authorize.Services;
using Business.Authorize.Services;
using CrossCutting.Structure.Business.Authorize;
using CrossCutting.Structure.IoC;
using Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace Business.Authorize
{
    public static class InitializeServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield return ContainerRegister.Service<ValidateAccountService, IValidateAccountService>();
            yield return ContainerRegister.Service<ApplicationDbContext, DbContext>();
            yield return ContainerRegister.UnitOfWork<AuthorizeUnitOfWork>();
        }
    }
}