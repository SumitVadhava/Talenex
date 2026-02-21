using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class alterRequestEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GoogleEventId",
                table: "UserSwapRequests",
                type: "nvarchar(max)",
                defaultValue: null,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GoogleEventId",
                table: "UserSwapRequests");
        }
    }
}
