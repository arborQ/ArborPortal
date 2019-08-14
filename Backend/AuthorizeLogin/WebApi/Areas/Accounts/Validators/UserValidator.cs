using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database;
using AuthorizeLogin.Persistance.Database.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace AuthorizeLogin.Areas.Accounts.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        private readonly IDatabaseContext _databaseContext;

        private async Task<bool> UserNameIsUnique(User user, string userName, CancellationToken cancellationToken)
        {
            var alreadyExists = await _databaseContext.Users.AnyAsync(u => u.UserName == user.UserName, cancellationToken: cancellationToken);

            return !alreadyExists;
        }

        private async Task<bool> EmailNameIsUnique(User user, string email, CancellationToken cancellationToken)
        {
            var alreadyExists = await _databaseContext.Users.AnyAsync(u => u.EmailAddress == user.EmailAddress, cancellationToken: cancellationToken);

            return !alreadyExists;
        }

        public UserValidator(IDatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            RuleFor(x => x.UserName).NotEmpty().MaximumLength(100).MustAsync(UserNameIsUnique).WithMessage("Given user name already exists");
            RuleFor(x => x.EmailAddress).NotEmpty().MaximumLength(100).MustAsync(EmailNameIsUnique).WithMessage("Given email already exists");
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
        }
    }
}
