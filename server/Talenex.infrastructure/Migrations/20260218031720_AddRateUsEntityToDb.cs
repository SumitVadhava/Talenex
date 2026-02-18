using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRateUsEntityToDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RateUs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OverallExperience = table.Column<int>(type: "int", nullable: false),
                    UiUxDesign = table.Column<int>(type: "int", nullable: false),
                    ApplicationSpeed = table.Column<int>(type: "int", nullable: false),
                    SkillsMatchingAccuracy = table.Column<int>(type: "int", nullable: false),
                    SearchAndFiltersEffectiveness = table.Column<int>(type: "int", nullable: false),
                    CommunityTrust = table.Column<int>(type: "int", nullable: false),
                    EaseOfNavigation = table.Column<int>(type: "int", nullable: false),
                    FeatureUsefulness = table.Column<int>(type: "int", nullable: false),
                    HelpAndSupportQuality = table.Column<int>(type: "int", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RateUs", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RateUs");
        }
    }
}
