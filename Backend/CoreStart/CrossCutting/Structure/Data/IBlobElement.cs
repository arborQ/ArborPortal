using System;
using System.IO;

namespace CoreStart.CrossCutting.Structure.Data
{
    public interface IBlobElement
    {
        Guid BlobKey { get; }

        Stream Blob { get; }
    }
}
