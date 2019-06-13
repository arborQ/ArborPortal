using System;
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

namespace CoreStart.Business.Recipes.Handlers
{
    internal class CreateRecipieDatabaseHandler : CreateBaseHandler<Recipe, IRecipe>,
        IRequestHandler<CreateRequestModel<IRecipe>, CreateResponse<IRecipe>>
    {
        private readonly IMediator _mediator;

        public CreateRecipieDatabaseHandler(RecipesUnitOfWork unitOfWork, IMediator mediator, IReadOnlyCollection<IValidator<IRecipe>> validators)
            : base(unitOfWork.Recipes, validators)
        {
            _mediator = mediator;
        }

        public async Task<CreateResponse<IRecipe>> Handle(CreateRequestModel<IRecipe> request, CancellationToken cancellationToken)
        {
            var response = await base.CreateItem(request);

            return response;
        }

        protected override Recipe DtoToModel(Recipe item, IRecipe itemDto)
        {
            item.RecipeName = itemDto.RecipeName;
            item.CreatedAt = DateTime.UtcNow;
            item.CreatedByUserId = 35; // !!!!!!!
            item.IsPublic = true;

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
