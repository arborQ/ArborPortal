using System.Threading.Tasks;

namespace CoreStart.CrossCutting.Structure.Services
{
    public interface IMapperService<TFrom, TTo> 
    {
        Task<TTo> Map(TFrom model);
    }
}
