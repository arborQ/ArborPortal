using System;
using System.IO;
using CoreStart.CrossCutting.Structure.Data;

namespace WebApi.Areas.Files.Models
{
    public class BlobElement : IBlobElement
    {
        public Guid BlobKey { get; set; }

        public Stream Blob { get; set; }
    }
}
