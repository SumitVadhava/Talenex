using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class UserFavourites : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }


        public List<Guid> FavIds { get; set; } = new();
    }
}
