namespace CoreStart.CrossCutting.Structure.Security
{
    public enum UserClaims
    {
        Authorized = 0,
        UsersRead = 1 << 0,
        UserEdit = 1 << 1,
        UserCreate = 1 << 2,
    }
}
