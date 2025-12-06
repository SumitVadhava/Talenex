using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class UserAvailability
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }

        //public string TimeZone { get; set; }

        [Required]
        public bool AvailableWeekdaysJson { get; set; }

        [Required]
        public bool AvailableWeekendsJson { get; set; }
        
        public int PreferredSessionDuration { get; set; }
        
        //public int MaxSwapsPerMonth { get; set; }
        public string PreferredSessionMode { get; set; }
    }

}
