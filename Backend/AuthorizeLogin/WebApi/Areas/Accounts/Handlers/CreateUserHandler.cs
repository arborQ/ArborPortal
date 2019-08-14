using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Areas.Accounts.Models;
using AuthorizeLogin.Areas.Accounts.Responses;
using AuthorizeLogin.Persistance.Database;
using AuthorizeLogin.Persistance.Database.Helpers;
using AuthorizeLogin.Persistance.Database.Models;
using FluentValidation;
using MediatR;

namespace AuthorizeLogin.Areas.Accounts.Handlers
{
    public class CreateUserHandler : IRequestHandler<CreateUserRequest, CreateUserResponse>
    {
        private readonly IDatabaseContext _databaseContext;
        private readonly IValidator<User> _createUserRequestValidator;

        public CreateUserHandler(IDatabaseContext databaseContext, IValidator<User> createUserRequestValidator)
        {
            _databaseContext = databaseContext;
            _createUserRequestValidator = createUserRequestValidator;
        }

        public async Task<CreateUserResponse> Handle(CreateUserRequest request, CancellationToken cancellationToken)
        {
            var newUser = new User
            {
                UserName = request.UserName,
                EmailAddress = request.EmailAddress,
                FirstName = request.FirstName,
                LastName = request.LastName,
            };

            var validationResult = await _createUserRequestValidator.ValidateAsync(newUser);

            if (!validationResult.IsValid)
            {
                return new CreateUserResponse
                {
                    IsSuccessfull = false,
                    Errors = validationResult.Errors.Select(a => new PropertyErrorModel { PropertyName = a.PropertyName.ToCamelCase(), ErrorMessage = a.ErrorMessage }).ToArray()
                };
            }

            var salt = PasswordHashHelper.GetSaltValue();
            var hash = PasswordHashHelper.HashPassword(request.Password, salt);

            newUser.LoginData = new LoginData
            {
                PasswordSalt = salt,
                PasswordHash = hash
            };

            var databaseUser = await _databaseContext.Users.AddAsync(newUser);
            await _databaseContext.SaveChangesAsync();

            return new CreateUserResponse { IsSuccessfull = true, CreatedUserId = databaseUser.Entity.Id };
        }
    }
}
