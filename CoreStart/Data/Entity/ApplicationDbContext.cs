using System;
using CoreStart.Data.Entity.Models.Account;
using CoreStart.Data.Entity.Models.Recipes;
using Microsoft.EntityFrameworkCore;

namespace CoreStart.Data.Entity
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Recipe> Recipes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(u => u.Login).IsUnique();
                e.Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);
            });

            modelBuilder.Entity<Recipe>(e => {
                e.Property(b => b.CreatedAt).HasDefaultValue(DateTime.UtcNow);
            });

            modelBuilder.Entity<MembershipProvider>().HasData(new MembershipProvider
            {
                Id = 1,
                Key = "google-oauth2",
                DisplayName = "Google"
            });
            modelBuilder.Entity<MembershipProvider>().HasData(new MembershipProvider
            {
                Id = 2,
                Key = "facebook",
                DisplayName = "Facebook"
            });
            modelBuilder.Entity<MembershipProvider>().HasData(new MembershipProvider
            {
                Id = 3,
                Key = "github",
                DisplayName = "GitHub"
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}