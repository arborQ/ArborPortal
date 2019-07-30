using System;
using System.Diagnostics.CodeAnalysis;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Data;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.CrossCutting.Structure.Security;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Areas.Files.Models;
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
        private readonly IMediator mediar;

        public UploadController(IMediator mediar)
        {
            this.mediar = mediar;
        }

        [HttpPost]
        public async Task<CreateResponse<string>> Upload(IFormFile file)
        {
            var blobResponse = await mediar.Send(new CreateRequestModel<IBlobElement, string>
            {
                NewItem = new BlobElement
                {
                    Blob = file.OpenReadStream(),
                    BlobKey = Guid.NewGuid()
                }
            });

            return blobResponse;
        }
    }

    //public interface IFormFile
    //{
    //    string ContentType { get; }
    //    string ContentDisposition { get; }
    //    IHeaderDictionary Headers { get; }
    //    long Length { get; }
    //    string Name { get; }
    //    string FileName { get; }
    //    Stream OpenReadStream();
    //    void CopyTo(Stream target);
    //    Task CopyToAsync(Stream target, CancellationToken cancellationToken = null);
    //}
}
