using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Persistance.Database.Models
{
    public class User
    {
        [Key]
        public long Id { get; set; }

        [Required, MaxLength(100), MinLength(4)]
        public string EmailAddress { get; set; }

        [Required, MaxLength(100)]
        public string UserName { get; set; }

        [MaxLength(100)]
        public string FirstName { get; set; }

        [MaxLength(100)]
        public string LastName { get; set; }

        [ForeignKey(nameof(LoginData))]
        public long? LoginDataId { get; set; }

        public virtual LoginData LoginData { get; set; }
    }
}
