﻿// <auto-generated />
using System;
using AuthorizeLogin.Persistance.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace AuthorizeLogin.Persistance.Database.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190809093527_init")]
    partial class init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("AuthorizeLogin.Persistance.Database.Models.LoginData", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.ToTable("LoginData");
                });

            modelBuilder.Entity("AuthorizeLogin.Persistance.Database.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("FirstName")
                        .HasMaxLength(100);

                    b.Property<string>("LastName")
                        .HasMaxLength(100);

                    b.Property<long?>("LoginDataId");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.HasKey("Id");

                    b.HasIndex("LoginDataId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("AuthorizeLogin.Persistance.Database.Models.User", b =>
                {
                    b.HasOne("AuthorizeLogin.Persistance.Database.Models.LoginData", "LoginData")
                        .WithMany()
                        .HasForeignKey("LoginDataId");
                });
#pragma warning restore 612, 618
        }
    }
}
