using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Security;
using Microsoft.AspNetCore.Mvc;
using WebApi.Security;

namespace WebApi.Areas.Files.Controllers
{
    [PortalAuthorize(UserClaims.UploadFiles)]
    [Route("api/[area]/[controller]")]
    [Area("Files")]
    [ApiController]
    [ExcludeFromCodeCoverage]
    public class UploadController
    {
        [HttpPost]
        public async Task Upload(Stream fileStream, string fileName)
        {

        }
    }
}
