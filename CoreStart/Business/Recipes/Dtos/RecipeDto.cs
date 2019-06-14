using System;
using CoreStart.CrossCutting.Structure.Business.Recipes.Models;

namespace Recipes.Dtos
{
    internal class RecipeDto : IRecipe
    {
        public long Id { get; set; }

        public string RecipeName { get; set; }

        public string MainFileName { get; set; }

        public DateTime CreatedAt { get; set; }

        public byte[] RowVersion { get; set; }
    }
}
