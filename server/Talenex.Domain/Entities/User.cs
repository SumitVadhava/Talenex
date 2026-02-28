using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Domain.Entities
{
    public class User : IEntity
    {
        public Guid Id { get; set; }

        //Authentication
        [Required]
        public String ClerkUserId { get; set; }

        public string Email { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastLoginAt { get; set; }

        public bool onBoarding {  get; set; }

        public bool isPremium { get; set; } = false;

        public string PremiumPlan { get; set; } = "Free";

        //Profile
        public UserProfile UserProfile { get; set; }

        //Availability

        public UserAvailability UserAvailability { get; set; }

        //Privacy Settings
        public UserPrivacy UserPrivacy { get; set; }

        // Reputation
        public UserReputation UserReputation { get; set; }

        //Skills
        public UserSkills UserSkills { get; set; }

        //Notifications
        public UserNotificationPreferences UserNotifications { get; set; }

        public ICollection<UserReviews> UserReviews { get; set; } = new List<UserReviews>();  // ✅
        
        public UserFavourites UserFavourites { get; set; }

        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

    }
}