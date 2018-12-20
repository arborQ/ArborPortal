using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class restrict_login : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM [Account].[User]");

            migrationBuilder.AlterColumn<string>(
                name: "Login",
                schema: "Account",
                table: "User",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_Login",
                schema: "Account",
                table: "User",
                column: "Login",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_Login",
                schema: "Account",
                table: "User");

            migrationBuilder.AlterColumn<string>(
                name: "Login",
                schema: "Account",
                table: "User",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 50);
        }
    }
}
