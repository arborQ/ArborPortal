using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Areas.Account.Models;
using WebApi.Areas.Account.Responses;

namespace WebApi.Areas.Account.Handlers
{
    public class AuthorizeJwtTokenHandler : IRequestHandler<JwtAuthorizeModel, AuthorizeResponseModel>
    {
        private readonly JwtConfiguration jwtConfiguration;

        public AuthorizeJwtTokenHandler(IOptions<JwtConfiguration> jwtConfiguration)
        {
            this.jwtConfiguration = jwtConfiguration.Value;
        }

        public async Task<AuthorizeResponseModel> Handle(JwtAuthorizeModel request, CancellationToken cancellationToken)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jsonToken = handler.ReadJwtToken(request.Token);
                var userName = jsonToken.Claims.FirstOrDefault(c => c.Type == "nickname");

                return await Task.FromResult(new AuthorizeResponseModel
                {
                    ExpireDate = jsonToken.ValidTo,
                    Source = jsonToken.Subject.Split("|")[0],
                    UserId = jsonToken.Subject,
                    UserName = userName.Value,
                    Token = CreateToken(jsonToken)
                });
            }
            catch
            {
                return AuthorizeResponseModel.NotAuthorized;
            }
        }

        private string CreateToken(JwtSecurityToken securityToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(jwtConfiguration.Key);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(GetClaims(securityToken)),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private IEnumerable<Claim> GetClaims(JwtSecurityToken securityToken)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, securityToken.Subject),
                new Claim(JwtRegisteredClaimNames.Sub, "arbor@o2.pl"),
                new Claim(ClaimTypes.Role, "recipes, users")
            };

            return claims;
        }
    }
}

