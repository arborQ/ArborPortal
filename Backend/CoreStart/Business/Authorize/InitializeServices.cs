using System.Collections.Generic;
using CoreStart.Business.Authorize.Services;
using CoreStart.CrossCutting.Structure.IoC;
using CoreStart.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Authorize
{
    public static class InitializeServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield return ContainerRegister.Service<ApplicationDbContext, DbContext>();
            yield return ContainerRegister.UnitOfWork<AuthorizeUnitOfWork>();
        }
    }
}