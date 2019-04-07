using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests;
using CoreStart.CrossCutting.Structure.Responses;
using MediatR;

namespace CoreStart.CrossCutting.Structure.Handlers
{
    public interface ICreateItemHandler<TModel, TDto> : IRequestHandler<CreateRequestModel<TDto>, CreateResponse<TDto>>
        where TModel : class, IEntity, new()
        where TDto : class, IEntity
    {
    }
}
