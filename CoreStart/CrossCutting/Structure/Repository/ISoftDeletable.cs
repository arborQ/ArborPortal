using System;

namespace CoreStart.CrossCutting.Structure.Repository
{
    public interface ISoftDeletable
    {
        DateTime? DeletedAt { get; }
    }
}
