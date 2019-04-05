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
    }
}
