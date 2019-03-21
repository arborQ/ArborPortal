using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.UnitOfWork;
using CoreStart.Data.Entity.Models.Account;
using CoreStart.Data.Entity.Repository;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Authorize.Services
{
    internal class AuthorizeUnitOfWork : UnitOfWork, IUnitOfWork
    {
        public AuthorizeUnitOfWork(DbContext dataBaseContext) : base(dataBaseContext)
        {
        }

        public IRepository<User> Users { get => CreateRepository<User>(); }
    }
}
