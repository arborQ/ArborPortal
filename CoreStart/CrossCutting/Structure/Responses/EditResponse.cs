using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Repository;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class EditResponse<TModel> where TModel : class, IEntity
    {
        public EditResponse()
        {
            IsSuccessful = true;
            ValidationErrors = new Dictionary<string, string[]>();
        }

        public bool IsSuccessful { get; set; }

        public IDictionary<string, string[]> ValidationErrors { get; set; }

        public TModel EditedItem { get; set; } 
    }
}
