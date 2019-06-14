using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreStart.Data.Entity
{
    public partial class add_recipe_filename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Recipes",
                table: "Recipe",
                nullable: false,
                defaultValue: new DateTime(2019, 6, 14, 9, 45, 40, 947, DateTimeKind.Utc).AddTicks(1208),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 915, DateTimeKind.Utc).AddTicks(7393));

            migrationBuilder.AddColumn<string>(
                name: "MainFileName",
                schema: "Recipes",
                table: "Recipe",
                maxLength: 36,
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(2019, 6, 14, 9, 45, 40, 939, DateTimeKind.Utc).AddTicks(9183),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 908, DateTimeKind.Utc).AddTicks(8533));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainFileName",
                schema: "Recipes",
                table: "Recipe");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Recipes",
                table: "Recipe",
                nullable: false,
                defaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 915, DateTimeKind.Utc).AddTicks(7393),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 6, 14, 9, 45, 40, 947, DateTimeKind.Utc).AddTicks(1208));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 908, DateTimeKind.Utc).AddTicks(8533),
                oldClrType: typeof(DateTime),
                oldDefaultValue: new DateTime(2019, 6, 14, 9, 45, 40, 939, DateTimeKind.Utc).AddTicks(9183));
        }
    }
}
