using System;
using CoreStart.CrossCutting.Structure.Business.Account.Models;

namespace CoreStart.Business.Account.Dtos
{
    internal class UserDto : IUser
    {
        public long Id { get; set; }

        public string Login { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public bool IsActive { get; set; }

        public DateTime? DeletedAt { get; set; }
    }
}
