using CrossCutting.Structure.Business.Authorize;
using MediatR;
using Structure.Models;
using System.Threading;
using System.Threading.Tasks;
using WebApi.Areas.Account.Models;

namespace WebApi.Areas.Account.Handlers
{
    public class ValidateUserHandler : IRequestHandler<LoginModel, ICurrentUser>
    {
        private IValidateAccountService ValidateAccountService;
        public ValidateUserHandler(IValidateAccountService validateAccountService)
        {
            ValidateAccountService = validateAccountService;
        }

        public async Task<ICurrentUser> Handle(LoginModel request, CancellationToken cancellationToken)
        {
            return await ValidateAccountService.IsAccoutValid(request.Login, request.Password);
        }
    }
}
