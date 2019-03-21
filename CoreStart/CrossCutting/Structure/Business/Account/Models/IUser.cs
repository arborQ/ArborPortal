using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Business.Account.Models
{
    public interface IUser : IEntity
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
