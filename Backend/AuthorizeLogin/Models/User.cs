using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Models
{
    [Table(nameof(User), Schema = "Authorize")]
    public class User
    {
        [Key]
        public long Id { get; set; }

        [MaxLength(50), Required]
        public string Login { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        [MaxLength(256)]
        public string Email { get; set; }

        public DateTime? DeletedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual ICollection<Role> Roles { get; set; }

        public virtual ICollection<Profile> Profiles { get; set; }

        [ForeignKey(nameof(LoginData))]
        public virtual long? LoginDataId { get; set; }

        public virtual LoginData LoginData { get; set; }
    }
}
