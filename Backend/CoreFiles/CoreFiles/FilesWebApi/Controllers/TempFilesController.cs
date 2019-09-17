using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace FilesWebApi.Controllers
{
    [Route("api/[controller]")]
    [Area("Files")]
    [ApiController]
    public class TempFilesController : ControllerBase
    {
        // POST api/files/tempfiles
        [HttpPost]
        public async Task<string> Post([FromBody] IFormFile files)
        {
            CloudStorageAccount storageAccount;

            if (!CloudStorageAccount.TryParse("DefaultEndpointsProtocol=https;AccountName=externalusersyn8508;AccountKey=o1ptek69KVvqxwRxYQlu4y0aL5fWgpxLl4oaSP1ZLvC5kXwQv8vjNJ2QkW+iUICZakrzwORmiTT/3qIDweyiBQ==;EndpointSuffix=core.windows.net", out storageAccount))
            {
                throw new Exception("no connection string");
            }
            // Create the CloudBlobClient that represents the 
            // Blob storage endpoint for the storage account.
            var cloudBlobClient = storageAccount.CreateCloudBlobClient();



            // Create a container called 'quickstartblobs' and 
            // append a GUID value to it to make the name unique.
            var cloudBlobContainer =
                cloudBlobClient.GetContainerReference("TempFilesContainer");
            await cloudBlobContainer.CreateAsync();

            return files.ContentDisposition;
        }
    }
}
