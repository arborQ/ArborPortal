using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using CoreStart.Business.Account.Dtos;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.Data.Entity.Models.Account;
using FluentValidation;

namespace CoreStart.Business.Account.Handlers.Users
{
    internal abstract class UserBaseHandler
    {
        protected readonly IReadOnlyCollection<IValidator<IUser>> _validators;

        protected UserBaseHandler()
        : this(new IValidator<IUser>[0])
        { }

        protected UserBaseHandler(IReadOnlyCollection<IValidator<IUser>> validators)
        {
            _validators = validators;
        }

        protected IDictionary<string, string[]> Validate(IUser user)
        {
            var validationResult = _validators
                .Select(validator => validator.Validate(user))
                .SelectMany(result => result.Errors)
                .Where(f => f != null)
                .ToList();

            return validationResult
                        .GroupBy(i => i.PropertyName)
                        .ToDictionary(
                            i => i.Key,
                            i => i.Select(v => v.ErrorMessage).ToArray()
                        );
        }

        protected virtual Expression<Func<User, bool>> DefaultItemFilter => item => !item.DeletedAt.HasValue;

        protected virtual IUser ModelToDto(UserDto userDto, User user)
        {
            userDto.Id = user.Id;
            userDto.FirstName = user.FirstName;
            userDto.LastName = user.LastName;
            userDto.FullName = user.FullName;
            userDto.Email = user.Email;
            userDto.IsActive = user.IsActive;
            userDto.Login = user.Login;

            return userDto;
        }

        protected IUser ModelToDto(User user)
        {
            return ModelToDto(new UserDto(), user);
        }

        protected virtual User DtoToModel(User user, IUser userDto)
        {
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Email = userDto.Email;
            user.IsActive = userDto.IsActive;
            user.Login = userDto.Login;

            return user;
        }
    }
}
