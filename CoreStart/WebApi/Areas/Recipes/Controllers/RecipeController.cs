using System.Diagnostics.CodeAnalysis;
using System.Threading.Tasks;
using CoreStart.Business.Recipes.Requests;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.CrossCutting.Structure.Security;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Security;

namespace WebApi.Areas.Recipes.Controllers
{
    [PortalAuthorize(UserClaims.RecipeRead)]
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
    }
}
