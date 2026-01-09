using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserNotificationPreferencesDto
    {
        public Guid UserId { get; set; }
        public bool NotifyOnMessage { get; set; }
        public bool NotifyOnSwapRequest { get; set; }
        public bool NotifyOnRatingReceived { get; set; }
    }

}
