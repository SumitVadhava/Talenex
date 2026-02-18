using System;
using System.ComponentModel.DataAnnotations;
using Talenex.Application.Common.Enums;


namespace Talenex.Application.DTOs.ResponseDtos
{
   
    public class FeedbackResponseDto
    {
        public Guid Id { get; set; }


        [Required]

        public Guid UserId { get; set; }

        [Required]  
        public string UserName { get; set; }

        [Required]
        public string UserEmail { get; set; }

        public DateTime DateTime { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);

        public int OverallExperience { get; set; } = 0;

        public int UiUxDesign { get; set; } = 0;
        public int ApplicationSpeed { get; set; } = 0;
        public int SkillsMatching { get; set; } = 0;
        public int SearchAndFilters { get; set; } = 0;
        public int CommunityTrust { get; set; } = 0;
        public int EaseOfNavigation { get; set; } = 0;
        public int FeatureUsefulness { get; set; } = 0;
        public int HelpAndSupport { get; set; } = 0;

        public string Message { get; set; } =  string.Empty;

    }
}
