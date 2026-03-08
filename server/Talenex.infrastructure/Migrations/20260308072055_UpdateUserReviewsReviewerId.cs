using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talenex.infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserReviewsReviewerId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ReviewerId",
                table: "UserReviews",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserReviews_ReviewerId",
                table: "UserReviews",
                column: "ReviewerId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReviews_UserProfiles_ReviewerId",
                table: "UserReviews",
                column: "ReviewerId",
                principalTable: "UserProfiles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReviews_UserProfiles_ReviewerId",
                table: "UserReviews");

            migrationBuilder.DropIndex(
                name: "IX_UserReviews_ReviewerId",
                table: "UserReviews");

            migrationBuilder.DropColumn(
                name: "ReviewerId",
                table: "UserReviews");
        }
    }
}
