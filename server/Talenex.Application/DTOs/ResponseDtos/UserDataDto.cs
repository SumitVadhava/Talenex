using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserDataDto
    {
        public Guid UserId { get; set; }

        public string Email { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public bool isPremium { get; set; }

        public string PremiumPlan { get; set; }

        public UserProfileDto? Profile { get; set; }
        public UserSkillsDto? Skills { get; set; }
        public UserAvailabilityDto? Availability { get; set; }
        public UserPrivacyDto? Privacy { get; set; }
        public UserReputationDto? Reputation { get; set; }
        public UserNotificationPreferencesDto? Notifications { get; set; }

        public List<UserReviewDto> Reviews { get; set; } = new();

        public UserFavouritesDto? Favourites { get; set; }
    }
}
            