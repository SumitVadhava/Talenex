using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class CreateUserNotificationPreferencesDto
    {
        public Guid UserId { get; set; }
        public bool NotifyOnMessage { get; set; }
        public bool NotifyOnSwapRequest { get; set; }
        public bool NotifyOnRatingReceived { get; set; }
    }

}
