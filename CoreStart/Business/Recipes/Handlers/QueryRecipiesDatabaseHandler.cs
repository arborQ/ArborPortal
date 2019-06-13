using System;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Recipes.Requests;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Recipes;
using MediatR;
using Recipes.Dtos;
using Recipes.Services;

namespace CoreStart.Business.Recipes.Handlers.Users
{
    internal class QueryUsersDatabaseHandler :
        QueryBaseHandler<Recipe, IRecipe, QueryMyUserRequestModel>,
        IRequestHandler<QueryMyUserRequestModel, QueryResponse<IRecipe>>
    {
        public QueryUsersDatabaseHandler(RecipesUnitOfWork unitOfWork)
            : base(unitOfWork.Recipes)
        {
        }

        public async Task<QueryResponse<IRecipe>> Handle(QueryMyUserRequestModel request, CancellationToken cancellationToken)
        {
            return await QuerySearch(request, cancellationToken);
        }

        protected override Expression<Func<Recipe, bool>> DefaultItemFilter(QueryMyUserRequestModel request)
        {
            if (string.IsNullOrEmpty(request.Search))
            {
                return base.DefaultItemFilter(request);
            }

            return user => user.RecipeName.Contains(request.Search);
        }

        protected override Expression<Func<Recipe, object>> DefaultOrderExpression(string request)
        {
            switch (request)
            {
                case "recipeName":
                    return item => item.RecipeName;
                default:
                    return base.DefaultOrderExpression(request);
            }
        }

        protected override Expression<Func<Recipe, IRecipe>> ModelToDto(QueryMyUserRequestModel request)
        {
            return model => new RecipeDto
            {
                Id = model.Id,
                RecipeName = model.RecipeName,
                RowVersion = model.RowVersion
            };
        }
    }
}
