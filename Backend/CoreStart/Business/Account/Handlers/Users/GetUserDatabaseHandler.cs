using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class GetUserDatabaseHandler : UserBaseHandler,
        IRequestHandler<GetUserRequestModel<IUser>, IUser>
    {
        private readonly AccountUnitOfWork _unitOfWork;

        public GetUserDatabaseHandler(AccountUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IUser> Handle(GetUserRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            var usersQuery = _unitOfWork.Users
                .Query()
                .Where(u => u.Id == request.Id)
                .Where(DefaultItemFilter);

            var user = await usersQuery.FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception($"No user for given Id={request.Id}");
            }

            return ModelToDto(user);
        }
    }
}
