using Microsoft.EntityFrameworkCore.Migrations;

namespace Entity.Migrations
{
    public partial class restrictemail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Account",
                table: "User",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Account",
                table: "User",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 256);
        }
    }
}
