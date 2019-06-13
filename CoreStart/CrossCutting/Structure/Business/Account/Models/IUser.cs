using System;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Business.Account.Models
{
    public interface IUser : IEntity
    {
        string Login { get; }

        string FirstName { get; }

        string LastName { get; }

        string Email { get; }

        bool IsActive { get; }

        DateTime? DeletedAt { get; }
    }
}
