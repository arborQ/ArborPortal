using System;

namespace CoreStart.CrossCutting.Structure.Repository
{
    public interface ITrackChanges
    {
        DateTime? ModifiedAt { get; }

        byte[] RowVersion { get; }
    }
}
