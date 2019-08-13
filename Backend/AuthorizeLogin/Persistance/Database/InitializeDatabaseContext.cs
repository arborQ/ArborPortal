using System;
using System.Collections.Generic;
using System.Text;

namespace AuthorizeLogin.Persistance.Database
{
    public static class InitializeDatabaseContext
    {
        public static Type ResolveDatabaseContextType()
        {
            return typeof(DatabaseContext);
        }
    }
}
