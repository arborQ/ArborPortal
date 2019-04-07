using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Handlers;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using CoreStart.Data.Entity.Handlers;
using FluentValidation;

[assembly: InternalsVisibleTo("Business.Account.Tests")]
namespace CoreStart.Business.Account.Handlers.Users
{
    internal class GenericCreateHandler<TModel, TDto> : CreateBaseHandler<TModel, TDto>,
        ICreateItemHandler<TModel, TDto>
        where TModel : class, IEntity, new()
        where TDto : class, IEntity
    {
        public GenericCreateHandler(IRepository<TModel> repository, IReadOnlyCollection<IValidator<TDto>> validators) 
            : base(repository, validators)
        {
        }

        public Task<CreateResponse<TDto>> Handle(CreateRequestModel<TDto> request, CancellationToken cancellationToken)
        {
            throw new System.NotImplementedException();
        }

        protected override TModel DtoToModel(TModel model, TDto dto)
        {
            throw new System.NotImplementedException();
        }

        protected override TDto ModelToDto(TModel model)
        {
            throw new System.NotImplementedException();
        }
    }
}
