using CoreStart.CrossCutting.Structure;

namespace WebApi.Models
{
    public class AzureConfiguration : IAzureConfiguration
    {
        public string AccountName { get; set; }

        public string AccountKey { get; set; }

        public string ImageContainer { get; set; }
    }
}
