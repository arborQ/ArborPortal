using System;
using System.Collections.Generic;
using System.Text;

namespace CoreStart.CrossCutting.Structure.Requests
{
    public abstract class SingleItemRequestModel<TKey>
    {
        public long Id { get; set; }
    }
}
