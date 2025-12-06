using System.ComponentModel.DataAnnotations;
using Talenex.Domain.Entities;

namespace Talenex.Domain.Entities
{
    public class UserSkills
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; }

        public string ? SkillsOffered { get; set; }  

        public string ? SkillsWanted { get; set; }
    }
}