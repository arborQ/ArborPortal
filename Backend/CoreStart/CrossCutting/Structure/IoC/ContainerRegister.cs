using System;
using CoreStart.CrossCutting.Structure.UnitOfWork;

namespace CoreStart.CrossCutting.Structure.IoC
{
    public class ContainerRegister
    {

        public ContainerRegister(Type instanceType, Type declarationType)
            :this(instanceType, declarationType, null)
        {
            
        }
        public ContainerRegister(Type instanceType, Type declarationType, string name)
        {
            InstanceType = instanceType;
            DeclarationType = declarationType;
            ComponentName = name;
        }

        public string ComponentName { get; private set; }

        public Type InstanceType { get; private set; }

        public Type DeclarationType { get; private set; }

        public static ContainerRegister Service<TInstance, TDeclaration>(string componentName = null) where TInstance: TDeclaration 
        {
            return new ContainerRegister(typeof(TInstance), typeof(TDeclaration), componentName);
        }

        public static ContainerRegister Service(Type instanceType, Type declarationType)
        {
            return new ContainerRegister(instanceType, declarationType);
        }

        public static ContainerRegister Validator(Type instanceType, Type declarationType)
        {
            return new ContainerRegister(instanceType, declarationType);
        }
        //public static ContainerRegister Validator<TInstance, TDeclaration>()
        //{
        //    return Service<TInstance, TDeclaration>();
        //}

        public static ContainerRegister UnitOfWork<TInstance>() where TInstance: IUnitOfWork
        {
            return new ContainerRegister(typeof(TInstance), typeof(TInstance));
        }
    }
}