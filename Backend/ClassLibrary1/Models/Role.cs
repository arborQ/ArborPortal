using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthorizeLogin.Persistance.Database.Models
{
    [Table(nameof(Role), Schema = "Authorize")]
    public class Role
    {
        [Key]
        public long Id { get; set; }

        public string Code { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
