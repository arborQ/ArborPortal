using System;

namespace CoreStart.CrossCutting.Structure.Security
{
    [Flags]
    public enum UserClaims
    {
        Authorized = 0,
        UsersRead = 1 << 0,
        UserEdit = 1 << 1,
        UserCreate = 1 << 2,
        UserDelete = 1 << 3,
        RecipeRead = 1 << 4,
        RecipeEdit = 1 << 5,
        RecipeCreate = 1 << 6,
        RecipeDelete = 1 << 7,
    }
}
