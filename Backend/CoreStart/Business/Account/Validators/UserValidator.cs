using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Validators
{
    internal class UserValidator : AbstractValidator<IUser>
    {
        private readonly AccountUnitOfWork _unitOfWork;

        public UserValidator(AccountUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

            RuleFor(u => u.Email).EmailAddress();
            RuleFor(u => u.Login).NotEmpty().Length(2, 40);
            RuleFor(u => u.Login)
                .MustAsync(ValidateUserLogin)
                .When(u => u.Id == 0)
                .WithMessage(user => $"Login '{user.Login}' already exists");
            RuleFor(u => u.IsActive)
                .Must(isActive => !isActive)
                .When(u => u.DeletedAt.HasValue)
                .WithMessage("Can't remove active element");
        }

        private async Task<bool> ValidateUserLogin(string login, CancellationToken cancellationToken)
        {
            var allDifferent = await _unitOfWork.Users.Query().AllAsync(u => u.Login != login);

            return allDifferent;
        }
    }
}
