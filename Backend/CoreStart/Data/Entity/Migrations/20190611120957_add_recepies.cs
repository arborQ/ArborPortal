using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreStart.Data.Entity
{
    public partial class add_recepies : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Recipes");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "User",
                nullable: false,
                defaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 908, DateTimeKind.Utc).AddTicks(8533));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "MembershipProvider",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "Account",
                table: "Membership",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "Recipe",
                schema: "Recipes",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    DeletedAt = table.Column<DateTime>(nullable: true),
                    CreatedAt = table.Column<DateTime>(nullable: false, defaultValue: new DateTime(2019, 6, 11, 12, 9, 56, 915, DateTimeKind.Utc).AddTicks(7393)),
                    CreatedByUserId = table.Column<long>(nullable: false),
                    RecipeName = table.Column<string>(maxLength: 200, nullable: false),
                    IsPublic = table.Column<bool>(nullable: false),
                    ModifiedAt = table.Column<DateTime>(nullable: true),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Recipe_User_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "Account",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipe_CreatedByUserId",
                schema: "Recipes",
                table: "Recipe",
                column: "CreatedByUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recipe",
                schema: "Recipes");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "Account",
                table: "User");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "Account",
                table: "MembershipProvider");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "Account",
                table: "Membership");
        }
    }
}
