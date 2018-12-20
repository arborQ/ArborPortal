using Data.Entity.Models.Account;
using Data.Entity.Repository;
using Microsoft.EntityFrameworkCore;
using Structure.Repository;
using Structure.UnitOfWork;

namespace Authorize.Services
{
    internal class AuthorizeUnitOfWork : UnitOfWork, IUnitOfWork
    {
        public AuthorizeUnitOfWork(DbContext dataBaseContext) : base(dataBaseContext)
        {
        }

        public IRepository<User> Users { get => CreateRepository<User>(); }
    }
}
