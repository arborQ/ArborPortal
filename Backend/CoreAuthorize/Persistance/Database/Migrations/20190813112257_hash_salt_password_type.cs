using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AuthorizeLogin.Persistance.Database.Migrations
{
    public partial class hash_salt_password_type : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoginData",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PasswordHash = table.Column<byte[]>(maxLength: 100, nullable: false),
                    PasswordSalt = table.Column<int>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoginData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    EmailAddress = table.Column<string>(maxLength: 100, nullable: false),
                    UserName = table.Column<string>(maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(maxLength: 100, nullable: true),
                    LastName = table.Column<string>(maxLength: 100, nullable: true),
                    LoginDataId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_LoginData_LoginDataId",
                        column: x => x.LoginDataId,
                        principalTable: "LoginData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "LoginData",
                columns: new[] { "Id", "PasswordHash", "PasswordSalt" },
                values: new object[] { 1L, new byte[] { 64, 132, 230, 137, 197, 174, 107, 113, 72, 124, 130, 228, 15, 4, 253, 204, 216, 3, 97, 136 }, -1150432778 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "EmailAddress", "FirstName", "LastName", "LoginDataId", "UserName" },
                values: new object[] { 1L, "admint@admin.pl", "admin", "admin", 1L, "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_LoginDataId",
                table: "Users",
                column: "LoginDataId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "LoginData");
        }
    }
}
