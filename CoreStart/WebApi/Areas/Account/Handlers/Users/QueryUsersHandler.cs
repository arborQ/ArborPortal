using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Requests.Users;
using MediatR;

namespace WebApi.Areas.Account.Handlers.Users
{
    public class QueryUsersHandler : IRequestHandler<QueryUsersRequestModel<IUser>, IReadOnlyCollection<IUser>>
    {
        private readonly IUsersCoreService _usersCoreService;
        private readonly IMediator _mediator;
        public QueryUsersHandler(IUsersCoreService usersCoreService, IMediator mediator)
        {
            _usersCoreService = usersCoreService;
            _mediator = mediator;
        }

        public async Task<IReadOnlyCollection<IUser>> Handle(QueryUsersRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            //var users = _mediator.Send(new QueryUsersRequestModel<IUser> { Search = request.Search, Page = request.Page, PageSize = request.PageSize });

            var users = _usersCoreService.GetElements();

            return await Task.FromResult(users);
        }

        //private IUser CreateDto(User user)
        //{
        //    return null;// new UserDto { };
        //}
    }
}
