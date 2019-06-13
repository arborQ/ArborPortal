using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Dtos;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Account;
using CoreStart.Data.Entity.Models.Recipes;
using FluentValidation;
using MediatR;
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

        public async Task<SingleItemResponseModel<IRecipe>> Handle(EditRequestModel<IRecipe> request, CancellationToken cancellationToken)
        {
            return await GetItem(request);
        }

        protected override Recipe DtoToModel(Recipe item, IRecipe itemDto)
        {
            item.FirstName = itemDto.FirstName;
            item.LastName = itemDto.LastName;
            item.Email = itemDto.Email;
            item.IsActive = itemDto.IsActive;

            return item;
        }

        protected override IRecipe ModelToDto(Recipe item)
        {
            return new RecipeDto
            {
                Id = item.Id,
                FirstName = item.FirstName,
                LastName = item.LastName,
                Email = item.Email,
                IsActive = item.IsActive,
                Login = item.Login
            };
        }
    }
}
