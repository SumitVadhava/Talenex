using System;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class PaymentResponseDto
    {
        public string OrderId { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Status { get; set; }
    }
}
