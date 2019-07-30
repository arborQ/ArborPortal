using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.Business.Account.Models;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class DeleteResponse<TModel> where TModel : class
    {
        public DeleteResponse()
        {
            IsSuccessful = true;
            ValidationErrors = new Dictionary<string, string[]>();
        }

        public bool IsSuccessful { get; set; }

        public IDictionary<string, string[]> ValidationErrors { get; set; }
    }
}
