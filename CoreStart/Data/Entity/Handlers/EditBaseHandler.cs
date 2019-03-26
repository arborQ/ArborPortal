using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Data.Entity.Handlers
{
    public abstract class EditBaseHandler<TModel, TDto, TRequest, TResponse>
        where TModel : class, IEntity
        where TDto : class, IEntity
        where TRequest : EditRequestModel<TDto>
        where TResponse : EditResponse<TDto>, new()
    {
        protected IRepository<TModel> Repository;
        protected IReadOnlyCollection<IValidator<TDto>> Validators;

        protected EditBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators)
        {
            Repository = repository;
            Validators = validators;
        }


        protected virtual Expression<Func<TModel, bool>> DefaultItemFilter(TRequest request)
        {
            return item => true;
        }

        public async Task<TResponse> EditItem(TRequest request)
        {
            var filterModel = DefaultItemFilter(request);

            var item = await Repository
                .Query()
                .Where(u => u.Id == request.Id)
                .Where(filterModel)
                .FirstOrDefaultAsync();

            if (item == null)
            {
                throw new Exception($"No {nameof(TModel)} for given Id={request.Id}");
            }

            var updatedItem = DtoToModel(item, request.EditContract);

            var validationResult = Validate(updatedItem);

            if (validationResult.Any())
            {
                var failureResponse = new TResponse
                {
                    IsSuccessful = false,
                    ValidationErrors = validationResult
                };

                return await Task.FromResult(failureResponse);
            }
            else
            {
                Repository.Update(updatedItem);
                await Repository.CommitAsync();
            }

            return new TResponse
            {
                IsSuccessful = true,
                EditedItem = ModelToDto(updatedItem)
            };
        }

        protected IDictionary<string, string[]> Validate(TModel user)
        {
            var validationResult = Validators
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

        protected abstract TModel DtoToModel(TModel item, TDto itemDto);

        protected abstract TDto ModelToDto(TModel item);
    }

    public abstract class EditBaseHandler<TModel, TDto, TRequest> : EditBaseHandler<TModel, TDto, TRequest, EditResponse<TDto>>
        where TModel : class, IEntity
        where TDto : class, IEntity
        where TRequest : EditRequestModel<TDto>
    {
        protected EditBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) : base(repository, validators)
        {
        }
    }

    public abstract class EditBaseHandler<TModel, TDto> : EditBaseHandler<TModel, TDto, EditRequestModel<TDto>, EditResponse<TDto>>
        where TModel : class, IEntity
        where TDto : class, IEntity
    {
        protected EditBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) : base(repository, validators)
        {
        }
    }
}
