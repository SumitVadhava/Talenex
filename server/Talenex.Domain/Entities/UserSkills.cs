using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Talenex.Domain.Entities;
using Talenex.Domain.ValueObjects;

namespace Talenex.Domain.Entities
{
    public class UserSkills : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }

        public List<SkillOfferedObj> SkillsOffered { get; set; } = new();

        public List<SkillWantsObj> SkillsWanted { get; set; } = new();
    }
}