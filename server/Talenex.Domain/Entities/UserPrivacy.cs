using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class UserPrivacy : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }


        public bool IsProfilePublic { get; set; } = true;
        public bool ShowLocation { get; set; } = true;
        public bool ShowSkills { get; set; } = true;
        public string AllowMessagesFrom { get; set; }
    }

}
