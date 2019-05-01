using System.Threading.Tasks;

namespace CoreStart.CrossCutting.Structure.Services
{
    public interface IMapperService<TFrom, TTo> 
        where TTo : class, new()
    {
        Task<TTo> Map(TFrom model);
    }
}
