using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpdateUserNotificationPreferencesDto
    {
        public bool NotifyOnMessage { get; set; }
        public bool NotifyOnSwapRequest { get; set; }
        public bool NotifyOnRatingReceived { get; set; }
    }

}
