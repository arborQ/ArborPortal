using System;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;

namespace WebApi.Areas.Recipes.Models
{
    public class RecipeViewModel : IRecipe
    {
        public string RecipeName { get; set; }

        public byte[] RowVersion { get; set; }

        public long Id { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
