using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Models;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.Data.Entity.Models.Account
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