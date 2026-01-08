using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.ValueObjects;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpdateUserSkillsDto
    {
        public List<SkillOfferedObj> SkillsOffered { get; set; }
        public List<SkillWantsObj> SkillsWanted { get; set; }
    }
}
