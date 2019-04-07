using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.Data.Entity.Models.Account
{
    public class Membership : IEntity
    {
        [Key]
        public long Id { get; set; }

        [ForeignKey(nameof(MembershipProvider))]
        public long MembershipProviderId { get; set; }

        public virtual MembershipProvider MembershipProvider { get; set; }

        [ForeignKey(nameof(User))]
        public long UserId { get; set; }

        public virtual User User { get; set; }

        public string MembershipIdentifier { get; set; }
    }
}
