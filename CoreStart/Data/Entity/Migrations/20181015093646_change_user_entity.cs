using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class change_user_entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "Account",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Login",
                schema: "Account",
                table: "User",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                schema: "Account",
                table: "User",
                nullable: true,
                computedColumnSql: "[FirstName] + ' ' + [LastName]");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                schema: "Account",
                table: "User");

            migrationBuilder.DropColumn(
                name: "FullName",
                schema: "Account",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Login",
                schema: "Account",
                table: "User");
        }
    }
}
