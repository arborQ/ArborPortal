﻿using System;
using System.Collections.Generic;
using System.Text;
using CoreStart.CrossCutting.Structure.Business.Account.Models;

namespace CoreStart.CrossCutting.Structure.Responses
{
    public class CreateResponse<TModel> where TModel : class
    {
        public CreateResponse()
        {
            IsSuccessful = true;
            ValidationErrors = new Dictionary<string, string[]>();
        }

        public bool IsSuccessful { get; set; }

        public IDictionary<string, string[]> ValidationErrors { get; set; }

        public IUser CreatedUser { get; set; }
    }
}
