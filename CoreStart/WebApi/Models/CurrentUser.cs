using Structure.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace WebApi.Models
{
    public class CurrentUser : ICurrentUser
    {
        private CurrentUser(long id)
        {
            Id = id;
        }

        public long Id { get; private set; }

        public string Login { get; set; }

        public string FullName { get; set; }

        public string[] Roles { get; set; }

        public string Email { get; set; }

        public static ICurrentUser CreateFromClaims(IEnumerable<Claim> claims)
        {
            if (long.TryParse(claims.Single(a => a.Type == nameof(ICurrentUser.Id)).Value, out long id))
            {
                var fullName = claims.Single(a => a.Type == nameof(ICurrentUser.FullName)).Value;
                var login = claims.Single(a => a.Type == nameof(ICurrentUser.Login)).Value;
                var email = claims.Single(a => a.Type == nameof(ICurrentUser.Email)).Value;

                return new CurrentUser(id)
                {
                    Email = email,
                    FullName = fullName,
                    Login = login
                };
            }

            return null;
        }
    }
}
