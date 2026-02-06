using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class userReputationEntityChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TotalSwapsCompleted",
                table: "UserReputation",
                type: "int",
                nullable: true,
                defaultValue: 0
                );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalSwapsCompleted",
                table: "UserReputation");
        }
    }
}
