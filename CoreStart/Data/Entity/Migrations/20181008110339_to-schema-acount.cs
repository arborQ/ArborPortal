using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class toschemaacount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Account.User",
                table: "Account.User");

            migrationBuilder.EnsureSchema(
                name: "Account");

            migrationBuilder.RenameTable(
                name: "Account.User",
                newName: "User",
                newSchema: "Account");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User",
                schema: "Account",
                table: "User",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User",
                schema: "Account",
                table: "User");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "Account",
                newName: "Account.User");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Account.User",
                table: "Account.User",
                column: "Id");
        }
    }
}
