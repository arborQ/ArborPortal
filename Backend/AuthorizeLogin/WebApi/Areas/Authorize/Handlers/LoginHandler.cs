using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Areas.Authorize.Requests;
using AuthorizeLogin.Areas.Authorize.Responses;
using AuthorizeLogin.Persistance.Database;
using AuthorizeLogin.Persistance.Database.Helpers;
using AuthorizeLogin.Persistance.Database.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AuthorizeLogin.Areas.Authorize.Handlers
{
    public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly IDatabaseContext _databaseContext;
        private readonly JwtConfigurationSettings _jwtConfiguration;

        public LoginHandler(IDatabaseContext databaseContext, IOptions<JwtConfigurationSettings> jwtConfiguration)
        {
            _databaseContext = databaseContext;
            _jwtConfiguration = jwtConfiguration.Value;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _databaseContext.Users
                .Include(u => u.LoginData)
                //.Include(u => u.Roles)
                .Where(u => u.UserName == request.Login)
                .FirstOrDefaultAsync();

            if (user == null || user.LoginData == null)
            {
                return await Task.FromResult(LoginResponse.FailResponse);
            }

            var getHash = PasswordHashHelper.HashPassword(request.Password, user.LoginData.PasswordSalt);

            if (!getHash.SequenceEqual(user.LoginData.PasswordHash))
            {
                return await Task.FromResult(LoginResponse.FailResponse);
            }

            return await Task.FromResult(LoginResponse.SuccessResponse(CreateToken(user)));
        }

        private string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfiguration.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.EmailAddress),
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim("sessionKey", Guid.NewGuid().ToString())
                }.Concat(new[] { "WithLoginData" }.Select(r => new Claim(ClaimTypes.Role, r)))),
                Expires = DateTime.UtcNow.AddMinutes(_jwtConfiguration.ExpiresMinutes),
                IssuedAt = DateTime.UtcNow,
                Issuer = _jwtConfiguration.Issuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
