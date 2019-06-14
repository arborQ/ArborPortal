using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using CoreStart.CrossCutting.Structure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Blob;

namespace CoreStart.Data.BlobStorage.Handlers
{
    class AzureGetBlobStorageHandler
    {
        private readonly AzureConfiguration azureConfiguration;

        public AzureGetBlobStorageHandler(AzureConfiguration azureConfiguration)
        {
            this.azureConfiguration = azureConfiguration;
        }

        private string GetContainerSASToken(string containerName)
        {
            string storageAccountName = this.azureConfiguration.AccountName;
            string permissions = "r";
            DateTime startTime = DateTime.UtcNow;
            DateTime expiryTime = startTime.AddHours(1);
            string policyIdentifer = "tempAccess";
            string signature = string.Empty;

            //Parse the connection string and return a reference to the storage account.
            var storageCredentials = new StorageCredentials(azureConfiguration.AccountName, azureConfiguration.AccountKey);
            var storageAccount = new CloudStorageAccount(storageCredentials, true);

            //Create the blob client object.
            var blobClient = storageAccount.CreateCloudBlobClient();
            //Get a reference to a container to use for the sample code, and create it if it does not exist.
            var container = blobClient.GetContainerReference(containerName);
            var canonicalPathToResource = ("/" + storageAccountName.Trim() + "/" + containerName).Trim();
            //Get a reference to a blob within the container.
            byte[] keyForSigning = System.Convert.FromBase64String(azureConfiguration.AccountKey.Trim());

            string sStartTime = startTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");
            string sExpiryTime = expiryTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");

            string stringtosign = permissions + "\n" +
                   sStartTime + "\n" +
                   sExpiryTime + "\n" +
                   canonicalPathToResource + "\n" +
                   policyIdentifer;

            using (var hmac = new HMACSHA256(keyForSigning))
            {
                signature = System.Convert.ToBase64String(
                   hmac.ComputeHash(Encoding.UTF8.GetBytes(stringtosign))
                );
            }

            var bcPermissions = new BlobContainerPermissions();
            bcPermissions.SharedAccessPolicies.Add(policyIdentifer, new SharedAccessBlobPolicy { });
            container.SetPermissionsAsync(bcPermissions);

            var sharedAccessSignature = $"st={Uri.EscapeDataString(sStartTime)}&se={Uri.EscapeDataString(sExpiryTime)}&sr=c&sp=r&sig={Uri.EscapeDataString(signature)}&si={Uri.EscapeDataString(policyIdentifer)}";

            return sharedAccessSignature;
        }
    }
}
