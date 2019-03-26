using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Requests.Users;
using CoreStart.CrossCutting.Structure.Responses;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Data.Entity.Handlers
{
    public abstract class QueryBaseHandler<T, TDto, TRequest, TResponse>
        where T : class, IEntity
        where TDto : class, IEntity
        where TRequest : QueryRequestModel<TDto>
        where TResponse : QueryResponse<TDto>, new()
    {
        protected QueryBaseHandler(IRepository<T> repository)
        {
            Repository = repository;
        }

        protected IRepository<T> Repository;

        protected virtual Expression<Func<T, bool>> DefaultItemFilter(TRequest request)
        {
            return item => true;
        }

        protected virtual Expression<Func<T, object>> DefaultOrderExpression(TRequest request)
        {
            return item => item.Id;
        }

        protected abstract Expression<Func<T, TDto>> ModelToDto(TRequest request);

        public async Task<TResponse> QuerySearch(TRequest request, CancellationToken cancellationToken)
        {
            var defaultFilter = DefaultItemFilter(request);
            var defaultOrder = DefaultOrderExpression(request);
            var dtoMapping = ModelToDto(request);

            var dbItems = Repository.Query()
                    .Where(defaultFilter);

            var count = await dbItems.CountAsync(cancellationToken);

            var items = dbItems
                .Skip(request.PageSize * (request.Page - 1))
                .Take(request.PageSize)
                .OrderBy(defaultOrder)
                .Select(dtoMapping.Compile())
                .ToList();

            var response = new TResponse { TotalCount = count, Items = items };

            return await Task.FromResult(response);
        }
    }

    public abstract class QueryBaseHandler<T, TDto, TRequest> : QueryBaseHandler<T, TDto, TRequest, QueryResponse<TDto>>
        where T : class, IEntity
        where TDto : class, IEntity
        where TRequest : QueryRequestModel<TDto>
    {
        protected QueryBaseHandler(IRepository<T> repository) : base(repository)
        {
        }
    }

    public abstract class QueryBaseHandler<T, TDto> : QueryBaseHandler<T, TDto, QueryRequestModel<TDto>, QueryResponse<TDto>>
        where T : class, IEntity
        where TDto : class, IEntity
    {
        protected QueryBaseHandler(IRepository<T> repository) : base(repository)
        {
        }
    }
}
