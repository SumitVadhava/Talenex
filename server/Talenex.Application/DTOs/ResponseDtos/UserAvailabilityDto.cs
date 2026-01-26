using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserAvailabilityDto
    {
        //[Required]
        public Guid Id { get; set; }

        //[Required]
        public bool AvailableOnWeekdays { get; set; }

        //[Required]
        public bool AvailableOnWeekends { get; set; }

        public int? PreferredSessionDuration { get; set; }

        public string PreferredSessionMode { get; set; } = "online";
    }
}
