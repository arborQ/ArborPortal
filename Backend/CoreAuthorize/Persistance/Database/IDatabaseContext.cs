using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthorizeLogin.Persistance.Database
{
    public interface IDatabaseContext
    {
        DbSet<User> Users { get; set; }

        DbSet<LoginData> LoginData { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

        Task<bool> Exists(CancellationToken cancellationToken = default);
    }
}
