using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Common.Enums;

namespace Talenex.Domain.Entities
{
    public class Payment : IEntity
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }

        public int Amount { get; set; }
        public string Currency { get; set; } = "INR";

        public string RazorpayOrderId { get; set; }
        public string? RazorpayPaymentId { get; set; }
        public string? RazorpaySignature { get; set; }

        public PaymentStatus Status { get; set; }
 
        public DateTime? CompletedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);

    }
}
