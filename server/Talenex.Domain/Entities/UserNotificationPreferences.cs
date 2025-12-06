using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Domain.Entities
{
    public class UserNotificationPreferences
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }
        public bool NotifyOnMessage { get; set; } = true;
        public bool NotifyOnSwapRequest { get; set; } = true;
        public bool NotifyOnRatingReceived { get; set; } = true;
        
        //public bool NotifyByEmail { get; set; }
    }

}
