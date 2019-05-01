using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.Data.Entity.Models.Account
{
    [Table(nameof(MembershipProvider), Schema = "Account")]
    public class MembershipProvider : IEntity
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(40)]
        public string Key { get; set; }

        [Required]
        [MaxLength(200)]
        public string DisplayName { get; set; }
    }
}
