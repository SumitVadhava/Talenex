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


        [Required]
        public string ? UserProfileImg { get; set; }

        public DateTime ?Created { get; set; }

        public int OverallExperience { get; set; } = 0;

        public int UiUxDesign { get; set; } = 0;
        public int ApplicationSpeed { get; set; } = 0;
        public int SkillsMatchingAccuracy { get; set; } = 0;
        public int SearchAndFiltersEffectiveness { get; set; } = 0;
        public int CommunityTrust { get; set; } = 0;
        public int EaseOfNavigation { get; set; } = 0;
        public int FeatureUsefulness { get; set; } = 0;
        public int HelpAndSupportQuality { get; set; } = 0;

        public string Message { get; set; } =  string.Empty;

    }
}
