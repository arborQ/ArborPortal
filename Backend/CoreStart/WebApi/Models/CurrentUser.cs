﻿using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using CoreStart.CrossCutting.Structure.Models;
using GraphQL.Types;

namespace WebApi.Models
{
    public class CurrentUserType : ObjectGraphType<CurrentUser>
    {
        public CurrentUserType()
        {
            Name = nameof(CurrentUser);

            Field(user => user.Email).Description("Email");
            Field(user => user.FullName).Description("FullName");
            Field(user => user.Login).Description("Login");
            Field(user => user.Id).Description("Id");
        }
    }

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
                //var fullName = claims.Single(a => a.Type == nameof(ICurrentUser.FullName)).Value;
                var login = claims.Single(a => a.Type == nameof(ICurrentUser.Login)).Value;
                var email = claims.Single(a => a.Type == nameof(ICurrentUser.Email)).Value;

                return new CurrentUser(id)
                {
                    Email = email,
                    FullName = email,
                    Login = login
                };
            }

            return null;
        }
    }
}
