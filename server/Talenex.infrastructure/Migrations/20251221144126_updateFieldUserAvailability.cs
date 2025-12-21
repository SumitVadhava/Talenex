using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateFieldUserAvailability : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvailableWeekendsJson",
                table: "UserAvailabilities",
                newName: "AvailableOnWeekends");

            migrationBuilder.RenameColumn(
                name: "AvailableWeekdaysJson",
                table: "UserAvailabilities",
                newName: "AvailableOnWeekdays");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AvailableOnWeekends",
                table: "UserAvailabilities",
                newName: "AvailableWeekendsJson");

            migrationBuilder.RenameColumn(
                name: "AvailableOnWeekdays",
                table: "UserAvailabilities",
                newName: "AvailableWeekdaysJson");
        }
    }
}
