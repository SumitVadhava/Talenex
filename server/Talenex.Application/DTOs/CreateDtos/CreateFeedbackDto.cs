using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class CreateFeedbackDto
    {
        public Guid UserId { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
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
    }
}
