using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Talenex.Application.DTOs.RequestDtos;
using Talenex.Application.DTOs.ResponseDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using System.Security.Claims;
using Talenex.Domain.Common.Enums;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]

    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderDto dto)
        {
            try
            {
                var orderId = await _paymentService.CreateOrderAsync(dto.Amount);
                
                var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userIdStr)) return Unauthorized();
                
                var payment = new Payment
                {
                    Id = Guid.NewGuid(),
                    UserId = Guid.Parse(userIdStr),
                    Amount = dto.Amount,
                    RazorpayOrderId = orderId,
                    Status = PaymentStatus.Pending,
                    Currency = dto.Currency
                };
                
                await _paymentService.CreateAsync(payment);

                return Ok(new { orderId });
            }
            catch (Exception ex)
            {
                var innerMessage = ex.InnerException?.Message ?? "";
                return BadRequest(new { 
                    message = "Failed to create Razorpay order", 
                    error = ex.Message, 
                    details = innerMessage,
                    stackTrace = ex.StackTrace // Useful for debugging Bad Request
                });
            }
        }

        [HttpPost("verify")]
        public async Task<IActionResult> VerifyPayment([FromBody] VerifyPaymentDto dto)
        {
            var isValid = _paymentService.VerifyPayment(
                dto.RazorpayOrderId,
                dto.RazorpayPaymentId,
                dto.RazorpaySignature
            );

            if (!isValid)
                return BadRequest(new { message = "Payment verification failed" });

            var payments = await _paymentService.GetAllAsync();
            var payment = payments.FirstOrDefault(p => p.RazorpayOrderId == dto.RazorpayOrderId);
            
            if (payment != null)
            {
                payment.RazorpayPaymentId = dto.RazorpayPaymentId;
                payment.RazorpaySignature = dto.RazorpaySignature;
                payment.Status = PaymentStatus.Success;
                payment.CompletedAt = DateTime.UtcNow.AddHours(5).AddMinutes(30);

                await _paymentService.UpdateAsync(payment);
            }

            return Ok(new { status = "Payment success", orderId = dto.RazorpayOrderId });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var payments = await _paymentService.GetAllAsync();
            return Ok(payments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var payment = await _paymentService.GetByIdAsync(id);
            if (payment == null) return NotFound();
            return Ok(payment);
        }
    }
}
