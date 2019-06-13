using CoreStart.CrossCutting.Structure;

namespace WebApi.Models
{
    public class WebConfiguration
    {
        public JwtConfiguration Jwt { get; set; }

        public AzureConfiguration AzureConfiguration { get; set; }
    }
}
