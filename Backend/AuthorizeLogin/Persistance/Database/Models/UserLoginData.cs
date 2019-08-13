using System.ComponentModel.DataAnnotations;

namespace AuthorizeLogin.Persistance.Database.Models
{
    public class LoginData
    {
        [Key]
        public long Id { get; set; }

        [Required, MaxLength(100)]
        public string PasswordHash { get; set; }

        [Required, MaxLength(100)]
        public string PasswordSalt { get; set; }
    }
}
