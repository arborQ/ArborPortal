using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using CoreStart.Business.Recipes.Requests;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Areas.Recipes.Models;

namespace WebApi.Areas.Recipes.Controllers
{
    // [PortalAuthorize(UserClaims.RecipeRead)]
    [Authorize(Roles = "regular")]
    [Route("api/[area]/[controller]")]
    [Area("Recipes")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class RecipeController
    {
        private readonly IMediator _mediator;

        public RecipeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<QueryResponse<IRecipe>> Values([FromQuery]QueryMyUserRequestModel model)
        {
            var users = await _mediator.Send(model);

            return users;
        }

        [HttpGet("details/{id}")]
        public async Task<SingleItemResponseModel<IRecipe>> Value(long id)
        {
            var response = await _mediator.Send(new SingleItemRequestModel<IRecipe> { Id = id });

            return response;
        }

        [HttpPost]
        //[PortalAuthorize(UserClaims.RecipeCreate)]
        public async Task<CreateResponse<IRecipe>> CreateRecipe([FromBody]RecipeViewModel model)
        {
            var recipe = await _mediator.Send(new CreateRequestModel<IRecipe>
            {
                NewItem = model
            });

            return recipe;
        }

        [HttpPut]
        //[PortalAuthorize(UserClaims.RecipeEdit)]
        public async Task<EditResponse<IRecipe>> EditRecipe([FromBody]RecipeViewModel model)
        {
            var recipe = await _mediator.Send(new EditRequestModel<IRecipe>
            {
                Id = model.Id,
                EditContract = model
            });

            return recipe;
        }
    }
}
