using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Models
{
    [Table(nameof(Role), Schema = "Authorize")]
    public class Role
    {
        [Key]
        public long Id { get; set; }

        public string Code { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }

        [ForeignKey(nameof(RoleUser))]
        public virtual long? RoleUserId { get; set; }

        public virtual User RoleUser { get; set; }

        [ForeignKey(nameof(RoleProfile))]
        public virtual long? RoleProfileId { get; set; }

        public virtual Profile RoleProfile { get; set; }
    }
}
