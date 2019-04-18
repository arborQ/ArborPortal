using System.Collections.Generic;
using CoreStart.CrossCutting.Structure.IoC;

namespace CoreStart.Data.Entity
{
    public static class InitializeServices
    {
        public static IEnumerable<ContainerRegister> Register()
        {
            yield break;
            //yield return ContainerRegister.Service(typeof(IMapperService<,>))
        }
    }
}
