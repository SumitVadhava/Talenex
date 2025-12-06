using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }

        //Authentication
        [Required]
        public string Email { get; set; } = null!;
        public bool EmailConfirmed { get; set; }

        [Required]
        public string PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? LastLogindAt { get; set; }

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