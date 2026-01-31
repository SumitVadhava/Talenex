using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class SwapRequestEmailDto
    {
        public string? PartnerImageUrl { get; set; }
        public string PartnerEmail { get; set; } = null!;

        public string? YourImageUrl { get; set; }
        public string? YourSkill { get; set; }
        public string? PartnerSkill { get; set; }

        public string? ScheduleDateTime { get; set; }
        public string Format { get; set; } = "Video Call";
        public int? DurationMinutes { get; set; }

        public string? PersonalMessage { get; set; }
        public string? YourName { get; set; }
    }

}