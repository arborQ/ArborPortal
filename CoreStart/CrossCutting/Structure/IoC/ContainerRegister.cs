using Structure.UnitOfWork;
using System;

namespace CrossCutting.Structure.IoC
{
    public class ContainerRegister
    {

        public ContainerRegister(Type instanceType, Type declarationType)
        {
            InstanceType = instanceType;
            DeclarationType = declarationType;
        }

        public Type InstanceType { get; private set; }

        public Type DeclarationType { get; private set; }

        public static ContainerRegister Service<TInstance, TDeclaration>()
        {
            return new ContainerRegister(typeof(TInstance), typeof(TDeclaration));
        }

        public static ContainerRegister UnitOfWork<TInstance>() where TInstance: IUnitOfWork
        {
            return new ContainerRegister(typeof(TInstance), typeof(TInstance));
        }
    }
}