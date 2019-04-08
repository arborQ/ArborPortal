﻿// <auto-generated />
using System;
using CoreStart.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CoreStart.Data.Entity
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190408075632_change_schema")]
    partial class change_schema
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CoreStart.Data.Entity.Models.Account.Membership", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MembershipIdentifier");

                    b.Property<long>("MembershipProviderId");

                    b.Property<long>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("MembershipProviderId");

                    b.HasIndex("UserId");

                    b.ToTable("Membership","Account");
                });

            modelBuilder.Entity("CoreStart.Data.Entity.Models.Account.MembershipProvider", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DisplayName")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasMaxLength(40);

                    b.HasKey("Id");

                    b.ToTable("MembershipProvider","Account");

                    b.HasData(
                        new { Id = 1L, DisplayName = "Google", Key = "google-oauth2" },
                        new { Id = 2L, DisplayName = "Facebook", Key = "facebook" },
                        new { Id = 3L, DisplayName = "GitHub", Key = "github" }
                    );
                });

            modelBuilder.Entity("CoreStart.Data.Entity.Models.Account.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("DeletedAt");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("FullName")
                        .ValueGeneratedOnAddOrUpdate()
                        .HasComputedColumnSql("[FirstName] + ' ' + [LastName]");

                    b.Property<bool>("IsActive");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Login")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("Login")
                        .IsUnique();

                    b.ToTable("User","Account");
                });

            modelBuilder.Entity("CoreStart.Data.Entity.Models.Account.Membership", b =>
                {
                    b.HasOne("CoreStart.Data.Entity.Models.Account.MembershipProvider", "MembershipProvider")
                        .WithMany()
                        .HasForeignKey("MembershipProviderId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("CoreStart.Data.Entity.Models.Account.User", "User")
                        .WithMany("Membership")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
