using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class RateUs : IEntity
    {
        public Guid Id { get; set; }


        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }

        public string UserName { get; set; }

        public string UserEmail { get; set; }

        public int OverallExperience { get; set; }
        public int UiUxDesign { get; set; }
        public int ApplicationSpeed { get; set; }
        public int SkillsMatchingAccuracy { get; set; }
        public int SearchAndFiltersEffectiveness { get; set; }
        public int CommunityTrust { get; set; }
        public int EaseOfNavigation { get; set; }
        public int FeatureUsefulness { get; set; }
        public int HelpAndSupportQuality { get; set; }

        public string? Message { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);
    }
}
