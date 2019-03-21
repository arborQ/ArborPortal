using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreStart.Data.Entity
{
    public partial class user_soft_delete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DeletedAt",
                schema: "Account",
                table: "User",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeletedAt",
                schema: "Account",
                table: "User");
        }
    }
}
