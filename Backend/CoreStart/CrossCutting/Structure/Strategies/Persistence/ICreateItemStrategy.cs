using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Responses;

namespace CoreStart.CrossCutting.Structure.Strategies.Persistence
{
    public interface ICreateItemStrategy<TModel, TContract>
         where TModel : class, IEntity, new()
    {
        Task<CreateResponse<TModel>> CreateItem(TContract model);
    }
}
