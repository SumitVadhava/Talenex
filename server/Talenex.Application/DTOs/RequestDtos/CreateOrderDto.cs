using System;

namespace Talenex.Application.DTOs.RequestDtos
{
    public class CreateOrderDto
    {
        public int Amount { get; set; }
        public string Currency { get; set; }
    }
}
