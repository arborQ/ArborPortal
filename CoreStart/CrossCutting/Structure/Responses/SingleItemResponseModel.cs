using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class SingleItemResponseModel<TModel> where TModel : class, IEntity
    {
        TModel Item { get; set; }
    }
}
