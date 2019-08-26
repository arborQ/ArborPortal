using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database.Helpers;
using AuthorizeLogin.Persistance.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthorizeLogin.Persistance.Database
{
    public class DatabaseContext : DbContext, IDatabaseContext
    {
        public DatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<LoginData> LoginData { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var salt = PasswordHashHelper.GetSaltValue();
            var hash = PasswordHashHelper.HashPassword("test123", salt);

            modelBuilder.Entity<LoginData>().HasData(new LoginData
            {
                Id = 1,
                PasswordSalt = salt,
                PasswordHash = hash
            });
            
        modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserName = "admin",
                EmailAddress = "admint@admin.pl",
                FirstName = "admin",
                LastName = "admin",
                LoginDataId = 1,
            });

            base.OnModelCreating(modelBuilder);
        }

        public Task<bool> Exists(CancellationToken cancellationToken = default)
        {
            return Database.EnsureCreatedAsync(cancellationToken);
        }
    }
}
