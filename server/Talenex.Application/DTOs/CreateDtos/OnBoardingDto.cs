using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class OnBoardingDto
    {
        public OnBoardingDto(){}
        public required CreateUserProfileDto  Profile { get; set; }

        public required CreateUserSkillsDto Skills { get; set; }

    }
}