using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Recipes;
using FluentValidation;
using MediatR;
using Recipes.Dtos;
using Recipes.Services;

namespace CoreStart.Business.Recipes.Handlers.Users
{
    internal class GetRecipeDatabaseHandler : GetBaseHandler<Recipe, IRecipe>,
        IRequestHandler<SingleItemRequestModel<IRecipe>, SingleItemResponseModel<IRecipe>>
    {
        public GetRecipeDatabaseHandler(RecipesUnitOfWork unitOfWork, IReadOnlyCollection<IValidator<IRecipe>> validators)
            : base(unitOfWork.Recipes, validators)
        {
        }

        public async Task<SingleItemResponseModel<IRecipe>> Handle(SingleItemRequestModel<IRecipe> request, CancellationToken cancellationToken)
        {
            return await GetItem(request);
        }

        protected override IRecipe ModelToDto(Recipe item)
        {
            return new RecipeDto
            {
                Id = item.Id,
                RecipeName = item.RecipeName,
                MainFileName = item.MainFileName,
                RowVersion = item.RowVersion
            };
        }
    }
}
