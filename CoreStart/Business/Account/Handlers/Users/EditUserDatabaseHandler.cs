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
    internal class EditUserDatabaseHandler : UserBaseHandler,
        IRequestHandler<EditUserRequestModel<IUser>, EditResponse<IUser>>
    {
        private readonly AccountUnitOfWork _unitOfWork;

        public EditUserDatabaseHandler(AccountUnitOfWork unitOfWork, IReadOnlyCollection<IValidator<IUser>> validators)
            : base(validators)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<EditResponse<IUser>> Handle(EditUserRequestModel<IUser> request, CancellationToken cancellationToken)
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

            var updatedUser = DtoToModel(user, request.EditUser);

            var validationResult = Validate(updatedUser);

            if (validationResult.Any())
            {
                var failureResponse = new EditResponse<IUser>()
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                await _unitOfWork.CommitAsync();
            }

            return new EditResponse<IUser>
            {
                IsSuccessful = true,
                EditedUser = ModelToDto(updatedUser)
            };
        }

        protected override User DtoToModel(User user, IUser userDto)
        {
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            user.IsActive = userDto.IsActive;

            return user;
        }
    }
}
