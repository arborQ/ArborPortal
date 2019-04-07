using CoreStart.Data.Entity.Models.Account;
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

            modelBuilder.Entity<User>()
                .Property(p => p.FullName)
                .HasComputedColumnSql($"[{nameof(User.FirstName)}] + ' ' + [{nameof(User.LastName)}]");

            base.OnModelCreating(modelBuilder);
        }
    }
}