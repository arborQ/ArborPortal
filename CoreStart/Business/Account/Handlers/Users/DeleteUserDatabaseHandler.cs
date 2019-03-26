using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using CoreStart.Data.Entity.Models.Account;
using FluentValidation;
using MediatR;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class DeleteUserDatabaseHandler : SoftDeleteBaseHandler<User, IUser>,
        IRequestHandler<DeleteRequestModel<IUser>, DeleteResponse<IUser>>
    {
        private readonly AccountUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;

        public DeleteUserDatabaseHandler(AccountUnitOfWork unitOfWork, IMediator mediator, IReadOnlyCollection<IValidator<IUser>> validators)
            : base(unitOfWork.Users, validators)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        public async Task<DeleteResponse<IUser>> Handle(DeleteRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            return await DeleteItem(request);
        }

        protected override User SetDeleteItem(User item)
        {
            item.Login = Guid.NewGuid().ToString();
            item.IsActive = false;
            item.DeletedAt = DateTime.UtcNow;

            return item;
        }
    }
}
