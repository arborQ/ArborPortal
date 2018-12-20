using Data.Entity.Models.Account;
using Microsoft.EntityFrameworkCore;

namespace Data.Entity
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(e =>
            {
                e.HasIndex(u => u.Login).IsUnique();
            });

            modelBuilder.Entity<User>()
                .Property(p => p.FullName)
                .HasComputedColumnSql($"[{nameof(User.FirstName)}] + ' ' + [{nameof(User.LastName)}]");

            base.OnModelCreating(modelBuilder);
        }
    }
}