using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.Data.Entity.Models.Account;

namespace CoreStart.Data.Entity.Models.Recipes
{
    [Table(nameof(Recipe), Schema = "Recipes")]
    public class Recipe : IEntity, ISoftDeletable, ITrackChanges
    {
        public long Id { get; set; }

        public DateTime? DeletedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        [ForeignKey(nameof(CreatedBy))]
        public long CreatedByUserId { get; set; }

        public virtual User CreatedBy { get; set; }

        [MaxLength(200), Required]
        public string RecipeName { get; set; }

        public bool IsPublic { get; set; }

        public DateTime? ModifiedAt { get; set; }

        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}
