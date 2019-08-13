using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database.Models;
using Microsoft.EntityFrameworkCore;

[assembly: InternalsVisibleTo("AuthorizeLogin")]
namespace AuthorizeLogin.Persistance.Database
{
    internal class DatabaseContext : DbContext, IDatabaseContext
    {
        public DatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<LoginData> LoginData { get; set; }

        public Task<bool> Exists(CancellationToken cancellationToken = default)
        {
            return Database.EnsureCreatedAsync(cancellationToken);
        }
    }
}
