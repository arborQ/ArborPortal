using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Data.Entity.Handlers
{
    public abstract class GetBaseHandler<TModel, TDto, TRequest, TResponse>
        where TModel : class, IEntity
        where TDto : class, IEntity
        where TRequest : SingleItemRequestModel<TDto>
        where TResponse : SingleItemResponseModel<TDto>, new()
    {
        protected IRepository<TModel> Repository;
        protected IReadOnlyCollection<IValidator<TDto>> Validators;

        protected GetBaseHandler(IRepository<TModel> repository)
        {
            Repository = repository;
        }


        protected virtual Expression<Func<TModel, bool>> DefaultItemFilter(TRequest request)
        {
            return item => true;
        }

        public async Task<TResponse> GetItem(TRequest request)
        {
            var query = Repository
                .Query()
                .Where(u => u.Id == request.Id);

            var item = await query.FirstOrDefaultAsync();

            if (item == null)
            {
                throw new Exception($"No item for given Id={request.Id}");
            }

            var dtoItem = ModelToDto(item);

            return new TResponse
            {
                Item = dtoItem
            };
        }

        protected abstract TDto ModelToDto(TModel item);
    }

    public abstract class GetBaseHandler<TModel, TDto, TRequest> : GetBaseHandler<TModel, TDto, TRequest, SingleItemResponseModel<TDto>>
        where TModel : class, IEntity
        where TDto : class, IEntity
        where TRequest : SingleItemRequestModel<TDto>
    {
        protected GetBaseHandler(IRepository<TModel> repository) : base(repository)
        {
        }
    }

    public abstract class GetBaseHandler<TModel, TDto> : GetBaseHandler<TModel, TDto, SingleItemRequestModel<TDto>, SingleItemResponseModel<TDto>>
        where TModel : class, IEntity
        where TDto : class, IEntity
    {
        protected GetBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) : base(repository)
        {
        }
    }
}
