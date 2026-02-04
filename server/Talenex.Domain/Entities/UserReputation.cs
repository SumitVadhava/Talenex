using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class UserReputation : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }
        public decimal AverageRating { get; set; }
        public int  TotalReviews { get; set; } = 0;
        public int ? TrustScore { get; set; } 
        public string ? BadgesJson { get; set; }

    }

}