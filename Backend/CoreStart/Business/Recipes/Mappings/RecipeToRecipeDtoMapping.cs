using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Services;
using CoreStart.Data.Entity.Models.Recipes;
using Recipes.Dtos;

namespace CoreStart.Business.Recipes.Mappings
{
    internal class RecipeToRecipeDtoMapping : IMapperService<Recipe, IRecipe>
    {
        public Task<IRecipe> Map(Recipe model)
        {
            var dto = new RecipeDto
            {
                Id = model.Id,
                RecipeName = model.RecipeName,
                MainFileName = model.MainFileName,
                RowVersion = model.RowVersion
            };

            return Task.FromResult(dto as IRecipe);
        }
    }

    internal class RecipeDtoToRecipe { }
}
