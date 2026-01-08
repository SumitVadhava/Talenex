using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.ValueObjects;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserSkillsDto
    {
        [Required]
        public Guid UserId { get; set; }

        public List<SkillOfferedObj> ? SkillsOffered { get; set; }

        public List<SkillWantsObj> ? SkillsWanted { get; set; }
    }
}