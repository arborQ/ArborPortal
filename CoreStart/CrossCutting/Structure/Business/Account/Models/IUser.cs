namespace Structure.Business.Account.Models
{
    public interface IUser
    {
        long Id { get; }

        string Login { get; }

        string FullName { get; }

        string FirstName { get; }

        string LastName { get; }

        string Email { get; }

        bool IsActive { get; }
    }
}
