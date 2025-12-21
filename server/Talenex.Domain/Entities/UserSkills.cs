using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Talenex.Domain.Entities;

namespace Talenex.Domain.Entities
{
    public class UserSkills : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }

        public string ? SkillsOffered { get; set; }  

        public string ? SkillsWanted { get; set; }
    }
}