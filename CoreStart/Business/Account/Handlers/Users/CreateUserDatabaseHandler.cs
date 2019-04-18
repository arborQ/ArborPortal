using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Factories;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.CrossCutting.Structure.Strategies.Persistence;
using CoreStart.Data.Entity.Models.Account;
using FluentValidation;
using MediatR;

[assembly: InternalsVisibleTo("Business.Account.Tests")]
namespace CoreStart.Business.Account.Handlers.Users
{
    internal class CreateUserDatabaseHandler : // CreateBaseHandler<User, IUser>,
        IRequestHandler<CreateRequestModel<IUser>, CreateResponse<IUser>>
    {
        private readonly IMediator _mediator;
        private readonly ICreateItemStrategy<User, IUser> _createItemStrategy;

        public CreateUserDatabaseHandler(AccountUnitOfWork unitOfWork, IMediator mediator, IReadOnlyCollection<IValidator<IUser>> validators, ICreateItemStrategyFactory createItemStrategyFactory)
            //: base(unitOfWork.Users, validators)
        {
            _mediator = mediator;
            _createItemStrategy = createItemStrategyFactory.CreateDatabaseItemStrategy<User, IUser>();
        }

        public async Task<CreateResponse<IUser>> Handle(CreateRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            var response = await _createItemStrategy.CreateItem(request.NewItem);

            return new CreateResponse<IUser> { };
        }

        //protected override User DtoToModel(User item, IUser itemDto)
        //{
        //    item.FirstName = itemDto.FirstName;
        //    item.LastName = itemDto.LastName;
        //    item.Email = itemDto.Email;
        //    item.Login = itemDto.Login;
        //    item.IsActive = itemDto.IsActive;
        //    item.DeletedAt = null;
        //    // CREATED ???

        //    return item;
        //}

        //protected override IUser ModelToDto(User item)
        //{
        //    return new UserDto
        //    {
        //        Id = item.Id,
        //        FirstName = item.FirstName,
        //        LastName = item.LastName,
        //        Email = item.Email,
        //        IsActive = item.IsActive,
        //        Login = item.Login
        //    };
        //}
    }
}
