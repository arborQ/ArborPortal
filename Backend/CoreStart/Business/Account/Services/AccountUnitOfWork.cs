using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.UnitOfWork;
using CoreStart.Data.Entity.Models.Account;
using CoreStart.Data.Entity.Repository;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Services
{
    internal class AccountUnitOfWork : UnitOfWork, IUnitOfWork
    {
        public AccountUnitOfWork(DbContext dataBaseContext) : base(dataBaseContext)
        {
        }

        public IRepository<User> Users { get => CreateRepository<User>(); }
    }
}
