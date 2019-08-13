using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Mvc;

namespace AuthorizeLogin.Areas.Accounts.Controllers
{
    [Route("api/[area]/[controller]")]
    [Area("Users")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class UserController : ControllerBase
    {
    }
}
