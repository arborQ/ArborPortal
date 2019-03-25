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

namespace CoreStart.Business.Account.Handlers.Users
{
    internal class CreateUserDatabaseHandler : UserBaseHandler,
        IRequestHandler<CreateUserRequestModel<IUser>, CreateResponse<IUser>>
    {
        private readonly AccountUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;

        public CreateUserDatabaseHandler(AccountUnitOfWork unitOfWork, IMediator mediator, IReadOnlyCollection<IValidator<IUser>> validators)
            : base(validators)
        {
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }

        public async Task<CreateResponse<IUser>> Handle(CreateUserRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            var createdUser = DtoToModel(new User(), request.CreatedUser);

            var validationResult = Validate(createdUser);

            if (validationResult.Any())
            {
                var failureResponse = new CreateResponse<IUser>()
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                await _unitOfWork.Users.AddAsAsync(createdUser);
                await _unitOfWork.CommitAsync();
            }

            if (createdUser.IsActive)
            {
                await _mediator.Publish(request);
            }

            return new CreateResponse<IUser>
            {
                IsSuccessful = true,
                CreatedUser = ModelToDto(createdUser)
            };
        }
    }
}
