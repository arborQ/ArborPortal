using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthorizeLogin.Persistance.Database.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthorizeLogin.Persistance.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<LoginData> LoginDatas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(u => u.Login).IsUnique();
            });

            modelBuilder.Entity<User>()
                .HasOne(u => u.UserLoginData)
                .WithOne(ld => ld.LoginUser)
                .HasForeignKey<LoginData>(ld => ld.Id);

            base.OnModelCreating(modelBuilder);
        }
    }
}
