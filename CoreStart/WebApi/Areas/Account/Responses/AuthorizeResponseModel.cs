using System;
using MediatR;

namespace WebApi.Areas.Account.Responses
{
    public class AuthorizeResponseModel: INotification
    {
        public bool IsAuthorized => !string.IsNullOrEmpty(UserId);

        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Source { get; set; }

        public DateTime? ExpireDate { get; set; }

        public static AuthorizeResponseModel NotAuthorized
        {
            get
            {
                return new AuthorizeResponseModel { UserId = null };
            }
        }
    }
}
