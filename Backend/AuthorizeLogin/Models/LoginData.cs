using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Models
{
    [Table(nameof(LoginData), Schema = "Authorize")]
    public class LoginData
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey(nameof(LoginUser))]
        public long LoginUserId { get; set; }

        public User LoginUser { get; set; }

        public string PasswordHash { get; set; }

        public string PasswordSalt { get; set; }
    }
}
