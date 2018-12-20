using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Structure.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;
using WebApi.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class UserSignInHandler : IRequestHandler<LoginModel, string>
    {
        private readonly IOptions<WebConfiguration> Configuration;
        private readonly IRequestHandler<LoginModel, ICurrentUser> ValidateUserHandler;
        private readonly IHttpContextAccessor Context;
        public UserSignInHandler(IHttpContextAccessor context, IOptions<WebConfiguration> configuration, IRequestHandler<LoginModel, ICurrentUser> validateUserHandler)
        {
            Configuration = configuration;
            ValidateUserHandler = validateUserHandler;
            Context = context;
        }

        public async Task<string> Handle(LoginModel request, CancellationToken cancellationToken)
        {
            var currentUser = await ValidateUserHandler.Handle(request, cancellationToken);

            var claims = GetClaims(currentUser).ToList();

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IssuedUtc = DateTime.UtcNow,
                AllowRefresh = true
            };

            await Context.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            return GenerateJwtToken(claims);
        }

        private IEnumerable<Claim> GetClaims(ICurrentUser user)
        {
            yield return new Claim(nameof(ICurrentUser.Id), user.Id.ToString());
            yield return new Claim(nameof(ICurrentUser.Email), user.Email);
            yield return new Claim(nameof(ICurrentUser.Login), user.Login);
            yield return new Claim(nameof(ICurrentUser.FullName), user.FullName);
        }

        private string GenerateJwtToken(IReadOnlyCollection<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.Value.Jwt.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken(
                Configuration.Value.Jwt.ValidIssuer,
                Configuration.Value.Jwt.ValidIssuer,
                claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
