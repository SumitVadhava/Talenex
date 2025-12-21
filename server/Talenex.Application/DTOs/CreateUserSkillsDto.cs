using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs
{
    public class CreateUserSkillsDto
    {
        [Required]
        public Guid UserId { get; set; }

        public string? SkillsOffered { get; set; }

        public string? SkillsWanted { get; set; }
    }
}
