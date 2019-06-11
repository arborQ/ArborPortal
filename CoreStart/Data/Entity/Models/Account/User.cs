using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Models;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.Data.Entity.Models.Account
{
    [Table(nameof(User), Schema = "Account")]
    public class User : IEntity, ICurrentUser, IUser, ISoftDeletable
    {
        [Key]
        public long Id { get; set; }

        [MaxLength(50)]
        public string FirstName { get; set; }

        [MaxLength(50)]
        public string LastName { get; set; }

        public bool IsActive { get; set; }

        [MaxLength(50), Required]
        public string Login { get; set; }

        [MaxLength(256)]
        public string Email { get; set; }

        public DateTime? DeletedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public virtual IQueryable<Membership> Membership { get; set; }
    }
}