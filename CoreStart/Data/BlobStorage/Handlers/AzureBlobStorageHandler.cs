using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure;
using CoreStart.CrossCutting.Structure.Data;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;

namespace CoreStart.Data.BlobStorage.Handlers
{
    internal class AzureBlobStorageHandler : IRequestHandler<CreateRequestModel<IBlobElement, string>, CreateResponse<string>>
    {
        private readonly AzureConfiguration azureConfiguration;

        public AzureBlobStorageHandler(IOptions<AzureConfiguration> azureConfiguration)
        {
            this.azureConfiguration = azureConfiguration.Value;
        }

        public async Task<CreateResponse<string>> Handle(CreateRequestModel<IBlobElement, string> request, CancellationToken cancellationToken)
        {
            var storageCredentials = new StorageCredentials(azureConfiguration.AccountName, azureConfiguration.AccountKey);

            // Create cloudstorage account by passing the storagecredentials
            var storageAccount = new CloudStorageAccount(storageCredentials, true);

            // Create the blob client.
            var blobClient = storageAccount.CreateCloudBlobClient();

            // Get reference to the blob container by passing the name by reading the value from the configuration (appsettings.json)
            var container = blobClient.GetContainerReference(azureConfiguration.ImageContainer);

            var blobName = request.NewItem.BlobKey.ToString().Replace("-", string.Empty);
            // Get the reference to the block blob from the container
            var blockBlob = container.GetBlockBlobReference(blobName);
            // Upload the file
            await blockBlob.UploadFromStreamAsync(request.NewItem.Blob);

            return new CreateResponse<string>
            {
                IsSuccessful = true,
                CreatedItem = blobName
            };
        }
    }
}
