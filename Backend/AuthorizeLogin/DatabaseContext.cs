using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeLogin.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthorizeLogin
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<LoginData> LoginDatas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(u => u.Login).IsUnique();
                e.Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);
            });

            modelBuilder.Entity<Role>(e =>
            {
                e.Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
