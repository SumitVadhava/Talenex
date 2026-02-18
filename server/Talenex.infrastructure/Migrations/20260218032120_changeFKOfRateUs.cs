using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeFKOfRateUs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_RateUs_UserId",
                table: "RateUs",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RateUs_Users_UserId",
                table: "RateUs",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RateUs_Users_UserId",
                table: "RateUs");

            migrationBuilder.DropIndex(
                name: "IX_RateUs_UserId",
                table: "RateUs");
        }
    }
}
