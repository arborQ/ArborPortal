using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Models
{
    [Table(nameof(Profile), Schema = "Authorize")]
    public class Profile
    {
        [Key]
        public long Id { get; set; }

        [Required, MaxLength(200)]
        public string ProfileName { get; set; }

        public virtual ICollection<Role> Roles { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
