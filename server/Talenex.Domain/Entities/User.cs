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
        public string ClerkUserId { get; set; } = null!;

        public string Email { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastLoginAt { get; set; }

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

        //Navigation collentions

    }
}