using System;

namespace Data.Repository
{
    public static class InitializeServices
    {
        public static Type RepositoryType { get => typeof(Repository<>); }
    }
}
