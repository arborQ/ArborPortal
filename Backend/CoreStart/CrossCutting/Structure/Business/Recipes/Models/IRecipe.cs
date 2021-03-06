﻿using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Business.Recipes.Models
{
    public interface IRecipe : IEntity
    {
        string RecipeName { get; }

        string MainFileName { get; }

        byte[] RowVersion { get; }
    }
}
