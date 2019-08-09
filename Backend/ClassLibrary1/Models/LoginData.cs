using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Persistance.Database.Models
{
    [Table(nameof(LoginData), Schema = "Authorize")]
    public class LoginData
    {
        [ForeignKey(nameof(LoginUser))]
        public long Id { get; set; }

        public virtual User LoginUser { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }
    }
}
