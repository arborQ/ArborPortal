using Data.Entity.Models.Account;
using Data.Entity.Repository;
using Microsoft.EntityFrameworkCore;
using Structure.Repository;
using Structure.UnitOfWork;

namespace Account.Services
{
    internal class AccountUnitOfWork : UnitOfWork, IUnitOfWork
    {
        public AccountUnitOfWork(DbContext dataBaseContext) : base(dataBaseContext)
        {
        }

        public IRepository<User> Users { get => CreateRepository<User>(); }
    }
}
