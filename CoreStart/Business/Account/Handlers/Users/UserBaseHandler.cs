using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.Business.Account.Dtos;
using CoreStart.CrossCutting.Structure.Business.Account.Models;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Models.Account;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Business.Account.Handlers.Users
{
    public abstract class QueryBaseHandler<T, TDto>
        where T: class, IEntity
        where TDto : class, IEntity
    {
        protected QueryBaseHandler(IRepository<T> repository)
        {
            Repository = repository;
        }

        protected IRepository<T> Repository;

        protected virtual Expression<Func<T, bool>> DefaultItemFilter(QueryRequestModel<TDto> request)
        {
            return item => true;
        }

        protected virtual Expression<Func<T, object>> DefaultOrderExpression(QueryRequestModel<TDto> request)
        {
            return item => item.Id;
        }

        protected abstract Func<T, TDto> ModelToDto(QueryRequestModel<TDto> request);

        public async Task<QueryResponse<TDto>> QuerySearch(QueryRequestModel<TDto> request, CancellationToken cancellationToken)
        {
            var defaultFilter = DefaultItemFilter(request);
            var defaultOrder = DefaultOrderExpression(request);
            var dtoMapping = ModelToDto(request);

            var dbItems = Repository.Query()
                    .Where(defaultFilter);

            var count = await dbItems.CountAsync(cancellationToken);

            var items = await dbItems
                .Skip(request.PageSize * (request.Page - 1))
                .Take(request.PageSize)
                .OrderBy(defaultOrder)
                .ToListAsync(cancellationToken);

            return await Task.FromResult(new QueryResponse<TDto>
            {
                TotalCount = count,
                Items = items.Select(dtoMapping).ToList()
            });
        }
    }

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

        protected virtual Expression<Func<User, long>> SortExpression<TKey>()
        {
            return (user) => user.Id;
        }

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
