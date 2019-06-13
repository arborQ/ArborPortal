using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Recipes;
using FluentValidation;
using MediatR;
using Recipes.Dtos;
using Recipes.Services;

namespace CoreStart.Business.Recipes.Handlers.Users
{
    internal class EditRecipeDatabaseHandler : EditBaseHandler<Recipe, IRecipe>,
        IRequestHandler<EditRequestModel<IRecipe>, EditResponse<IRecipe>>
    {
        public EditRecipeDatabaseHandler(RecipesUnitOfWork unitOfWork, IReadOnlyCollection<IValidator<IRecipe>> validators)
            : base(unitOfWork.Recipes, validators)
        {
        }

        public async Task<EditResponse<IRecipe>> Handle(EditRequestModel<IRecipe> request, CancellationToken cancellationToken)
        {
            return await EditItem(request);
        }

        protected override Recipe DtoToModel(Recipe item, IRecipe itemDto)
        {
            item.RecipeName = itemDto.RecipeName;
            item.ModifiedAt = DateTime.UtcNow;

            return item;
        }

        protected override IRecipe ModelToDto(Recipe item)
        {
            return new RecipeDto
            {
                Id = item.Id,
                RecipeName = item.RecipeName,
                RowVersion = item.RowVersion
            };
        }
    }
}
