using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreBackend
{
    interface Interface
    {
        void Log(Exception ex) => throw ex;
    }
}
