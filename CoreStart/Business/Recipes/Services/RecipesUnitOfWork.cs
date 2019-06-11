using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.UnitOfWork;
using CoreStart.Data.Entity.Models.Recipes;
using CoreStart.Data.Entity.Repository;
using Microsoft.EntityFrameworkCore;

namespace Recipes.Services
{
    internal class RecipesUnitOfWork : UnitOfWork, IUnitOfWork
    {
        public RecipesUnitOfWork(DbContext dataBaseContext) : base(dataBaseContext)
        {
        }

        public IRepository<Recipe> Recipes { get => CreateRepository<Recipe>(); }
    }
}
