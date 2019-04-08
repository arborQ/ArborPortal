using Microsoft.EntityFrameworkCore.Migrations;

namespace CoreStart.Data.Entity
{
    public partial class change_schema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "MembershipProvider",
                newName: "MembershipProvider",
                newSchema: "Account");

            migrationBuilder.RenameTable(
                name: "Membership",
                newName: "Membership",
                newSchema: "Account");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "MembershipProvider",
                schema: "Account",
                newName: "MembershipProvider");

            migrationBuilder.RenameTable(
                name: "Membership",
                schema: "Account",
                newName: "Membership");
        }
    }
}
