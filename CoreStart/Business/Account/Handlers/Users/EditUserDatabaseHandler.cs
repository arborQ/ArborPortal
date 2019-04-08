using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Dtos;
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
    internal class EditUserDatabaseHandler : EditBaseHandler<User, IUser>,
        IRequestHandler<EditRequestModel<IUser>, EditResponse<IUser>>
    {
        public EditUserDatabaseHandler(AccountUnitOfWork unitOfWork, IReadOnlyCollection<IValidator<IUser>> validators)
            : base(unitOfWork.Users, validators)
        {
        }

        public async Task<EditResponse<IUser>> Handle(EditRequestModel<IUser> request, CancellationToken cancellationToken)
        {
            return await EditItem(request);
        }

        protected override User DtoToModel(User item, IUser itemDto)
        {
            item.FirstName = itemDto.FirstName;
            item.LastName = itemDto.LastName;
            item.Email = itemDto.Email;
            item.IsActive = itemDto.IsActive;

            return item;
        }

        protected override IUser ModelToDto(User item)
        {
            return new UserDto
            {
                Id = item.Id,
                FirstName = item.FirstName,
                LastName = item.LastName,
                Email = item.Email,
                IsActive = item.IsActive,
                Login = item.Login
            };
        }
    }
}
