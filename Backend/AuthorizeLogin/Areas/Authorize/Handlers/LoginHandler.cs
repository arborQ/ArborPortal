using System;
using System.Data.Entity;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Areas.Authorize.Requests;
using AuthorizeLogin.Areas.Authorize.Responses;
using AuthorizeLogin.Persistance.Database;
using MediatR;
using Microsoft.IdentityModel.Tokens;

namespace AuthorizeLogin.Areas.Authorize.Handlers
{
    public class LoginHandler : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly DatabaseContext _databaseContext;

        public LoginHandler(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var user = await _databaseContext.Users
                .Include(u => u.UserLoginData)
                .Include(u => u.Roles)
                .Where(u => u.Login == request.Login)
                .FirstOrDefaultAsync();

            if (user == null || user.UserLoginData == null)
            {
                return await Task.FromResult(LoginResponse.FailResponse);
            }

            return await Task.FromResult(LoginResponse.SuccessResponse(CreateToken("arbor", new[] { "admin", "regular" })));
        }

        private string CreateToken(string name, string[] roles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, "12345"),
                    new Claim(ClaimTypes.Email, "arbor@o2.pl"),
                    new Claim(ClaimTypes.Name, name)
                }.Concat(roles.Select(r => new Claim(ClaimTypes.Role, r)))),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
