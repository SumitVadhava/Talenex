using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class updateTheTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PreferredSessionDuration",
                table: "UserAvailabilities",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "PreferredSessionDuration",
                table: "UserAvailabilities",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);


        }
    }
}
