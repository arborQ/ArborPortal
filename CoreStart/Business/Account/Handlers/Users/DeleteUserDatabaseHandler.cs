using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Services;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Models.Account;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class DeleteUserDatabaseHandler : UserBaseHandler,
        IRequestHandler<DeleteUserRequestModel<IUser>, DeleteResponse<IUser>>
    {
        private readonly AccountUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;

        public DeleteUserDatabaseHandler(AccountUnitOfWork unitOfWork, IMediator mediator, IReadOnlyCollection<IValidator<IUser>> validators)
            : base(validators)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        public async Task<DeleteResponse<IUser>> Handle(DeleteUserRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            var user = await _unitOfWork.Users
                .Query()
                .Where(u => u.Id == request.Id)
                .Where(DefaultItemFilter)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new Exception($"No user for given Id={request.Id}");
            }

            var updatedUser = DtoToModel(user, null);

            var validationResult = Validate(updatedUser);

            if (validationResult.Any())
            {
                var failureResponse = new DeleteResponse<IUser>()
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                _unitOfWork.Users.Update(updatedUser);
                await _unitOfWork.CommitAsync();
            }

            await _mediator.Publish(request);

            return new DeleteResponse<IUser>
            {
                IsSuccessful = true,
            };
        }

        protected override User DtoToModel(User user, IUser userDto)
        {
            user.Login = Guid.NewGuid().ToString();
            user.IsActive = false;
            user.DeletedAt = DateTime.UtcNow;

            return user;
        }
    }
}
