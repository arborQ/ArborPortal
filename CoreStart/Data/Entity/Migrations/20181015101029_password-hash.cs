using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class passwordhash : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                schema: "Account",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                schema: "Account",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                schema: "Account",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                schema: "Account",
                table: "User");
        }
    }
}
