namespace WebApi.Models
{
    public class JwtConfiguration
    {
        public string ValidIssuer { get; set; }

        public string ValidAudience { get; set; }

        public string Key { get; set; }
    }
}
