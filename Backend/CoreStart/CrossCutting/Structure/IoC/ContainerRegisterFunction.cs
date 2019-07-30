using System;

namespace CoreStart.CrossCutting.Structure.IoC
{
    public class ContainerRegisterFunction
    {
        internal ContainerRegisterFunction(Type instanceType, Func<object> resolveService)
        {
            InstanceType = instanceType;
            ResolveService = resolveService;
        }

        public Type InstanceType { get; private set; }
        public Func<object> ResolveService { get; private set; }

        public static ContainerRegisterFunction Service<TInstance, TDeclaration>(Func<TDeclaration> resolve) 
            where TDeclaration: class, TInstance
        {
            return new ContainerRegisterFunction(typeof(TInstance), resolve);
        }
    }
}
