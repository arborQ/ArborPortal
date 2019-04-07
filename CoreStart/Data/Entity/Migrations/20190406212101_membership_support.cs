using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreStart.Data.Entity
{
    public partial class membership_support : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                schema: "Account",
                table: "User");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                schema: "Account",
                table: "User");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Account",
                table: "User",
                maxLength: 256,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 256);

            migrationBuilder.CreateTable(
                name: "MembershipProvider",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Key = table.Column<string>(maxLength: 40, nullable: false),
                    DisplayName = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipProvider", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    MembershipProviderId = table.Column<long>(nullable: false),
                    UserId = table.Column<long>(nullable: false),
                    MembershipIdentifier = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Membership_MembershipProvider_MembershipProviderId",
                        column: x => x.MembershipProviderId,
                        principalTable: "MembershipProvider",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Membership_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "Account",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "MembershipProvider",
                columns: new[] { "Id", "DisplayName", "Key" },
                values: new object[] { 1L, "Google", "google-oauth2" });

            migrationBuilder.InsertData(
                table: "MembershipProvider",
                columns: new[] { "Id", "DisplayName", "Key" },
                values: new object[] { 2L, "Facebook", "facebook" });

            migrationBuilder.InsertData(
                table: "MembershipProvider",
                columns: new[] { "Id", "DisplayName", "Key" },
                values: new object[] { 3L, "GitHub", "github" });

            migrationBuilder.CreateIndex(
                name: "IX_Membership_MembershipProviderId",
                table: "Membership",
                column: "MembershipProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_Membership_UserId",
                table: "Membership",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Membership");

            migrationBuilder.DropTable(
                name: "MembershipProvider");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                schema: "Account",
                table: "User",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 256,
                oldNullable: true);

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
    }
}
