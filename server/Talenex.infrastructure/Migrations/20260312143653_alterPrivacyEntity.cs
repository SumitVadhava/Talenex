using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class alterPrivacyEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "AllowMessagesFrom",
                table: "UserPrivacy",
                type: "bit", nullable: false, 
                defaultValue: true, 
                oldClrType: typeof(string), 
                oldType: "nvarchar(max)"
             );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
            name: "AllowMessagesFrom",
            table: "UserPrivacy",
            type: "nvarchar(max)",
            nullable: false,
            oldClrType: typeof(bool),
            oldType: "bit",
            oldDefaultValue: true);
        }
    }
}
