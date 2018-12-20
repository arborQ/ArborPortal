using Structure.Business.Account.Models;
using Structure.Models;
using Structure.Repository;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Data.Entity.Models.Account
{
    [Table("User", Schema = "Account")]
    public class User : IEntity, ICurrentUser, IUser
    {
        [Key]
        public long Id { get; set; }

        [MaxLength(50), Required]
        public string FirstName { get; set; }

        [MaxLength(50), Required]
        public string LastName { get; set; }

        public bool IsActive { get; set; }

        [MaxLength(50), Required]
        public string Login { get; set; }

        public string FullName { get; set; }

        [MaxLength(256), Required]
        public string Email { get; set; }

        public string[] Roles => new string[] { };

        public string PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
    }
}