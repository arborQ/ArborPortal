using System;

namespace CoreStart.CrossCutting.Structure.Repository
{
    public interface IEntity
    {
        long Id { get; }

        DateTime CreatedAt { get; }
    }
}
