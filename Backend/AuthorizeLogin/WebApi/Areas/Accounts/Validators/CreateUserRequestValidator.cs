using AuthorizeLogin.Areas.Accounts.Models;
using FluentValidation;

namespace AuthorizeLogin.Areas.Accounts.Validators
{
    public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
    {
        public CreateUserRequestValidator()
        {
            RuleFor(x => x.ConfirmPassword).Must((request, password) => request.Password == password);
            RuleFor(x => x.UserName).NotEmpty();
            RuleFor(x => x.EmailAddress).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
        }
    }
}
