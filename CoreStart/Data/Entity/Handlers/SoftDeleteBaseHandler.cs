using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using FluentValidation;

namespace CoreStart.Data.Entity.Handlers
{
    public abstract class SoftDeleteBaseHandler<TModel, TDto, TRequest, TResponse> : EditBaseHandler<TModel, TDto>
        where TModel : class, IEntity, ISoftDeletable
        where TDto : class, IEntity
        where TRequest : DeleteRequestModel<TDto>
        where TResponse : DeleteResponse<TDto>, new()
    {

        protected SoftDeleteBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators)
            : base(repository, validators)
        {
        }

        public async Task<TResponse> DeleteItem(TRequest request)
        {
            var editResponse = await EditItem(new EditRequestModel<TDto> { Id = request.Id });

            return new TResponse
            {
                IsSuccessful = editResponse.IsSuccessful,
                ValidationErrors = editResponse.ValidationErrors
            };
        }

        protected override Expression<Func<TModel, bool>> DefaultItemFilter(EditRequestModel<TDto> request)
        {
            return item => item.DeletedAt == null;
        }

        protected override TModel DtoToModel(TModel item, TDto itemDto)
        {
            item = SetDeleteItem(item);

            return item;
        }

        protected override TDto ModelToDto(TModel item)
        {
            return null;
        }

        protected abstract TModel SetDeleteItem(TModel item);
    }

    public abstract class SoftDeleteBaseHandler<TModel, TDto, TRequest> : SoftDeleteBaseHandler<TModel, TDto, TRequest, DeleteResponse<TDto>>
        where TModel : class, IEntity, ISoftDeletable
        where TDto : class, IEntity
        where TRequest : DeleteRequestModel<TDto>
    {
        protected SoftDeleteBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) : base(repository, validators)
        {
        }
    }

    public abstract class SoftDeleteBaseHandler<TModel, TDto> : SoftDeleteBaseHandler<TModel, TDto, DeleteRequestModel<TDto>, DeleteResponse<TDto>>
        where TModel : class, IEntity, ISoftDeletable
        where TDto : class, IEntity
    {
        protected SoftDeleteBaseHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) : base(repository, validators)
        {
        }
    }
}
