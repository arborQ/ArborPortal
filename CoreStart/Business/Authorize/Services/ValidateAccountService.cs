using Authorize.Services;
using CrossCutting.Structure.Business.Authorize;
using Microsoft.EntityFrameworkCore;
using Structure.Models;
using Structure.Services;
using System;
using System.Threading.Tasks;

namespace Business.Authorize.Services
{
    internal class ValidateAccountService : IValidateAccountService
    {
        private readonly AuthorizeUnitOfWork AuthorizeUnitOfWork;
        private readonly ICryptography Cryptography;
        private const string DefaultPassword = "Haslo123!";

        public ValidateAccountService(AuthorizeUnitOfWork authorizeUnitOfWork, ICryptography cryptography)
        {
            AuthorizeUnitOfWork = authorizeUnitOfWork;
            Cryptography = cryptography;
        }

        public async Task<ICurrentUser> IsAccoutValid(string login, string password)
        {
            var user = await AuthorizeUnitOfWork.Users.Items.SingleAsync(e => e.Login == login);

            if (user == null)
            {
                throw new UnauthorizedAccessException($"User {login} is invalid");
            }

            if (string.IsNullOrEmpty(user.PasswordHash) && password == DefaultPassword)
            {
                var passwordSalt = Cryptography.GenerateSalt();
                var passwordHash = Cryptography.HashPassword(DefaultPassword, passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;

                await AuthorizeUnitOfWork.CommitAsync();
            }
            else
            {
                var hashedPassword = Cryptography.HashPassword(password, user.PasswordSalt);

                if (hashedPassword != user.PasswordHash)
                {
                    throw new UnauthorizedAccessException($"Invalid password");
                }
            }

            return user as ICurrentUser;
        }
    }
}