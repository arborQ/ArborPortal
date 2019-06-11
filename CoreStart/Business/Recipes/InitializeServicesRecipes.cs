using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.IoC;
using Recipes.Services;

namespace CoreStart.Business.Recipes
{
    public static class InitializeRecipesServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield return ContainerRegister.UnitOfWork<RecipesUnitOfWork>();
        }
    }
}
