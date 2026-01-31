using Application.DTOs;
using Application.IRepository;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/swap-request")]
public class SwapRequestController : ControllerBase
{
    private readonly IEmailService _emailService;

    public SwapRequestController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendSwapRequest([FromBody] SwapRequestEmailDto dto)
    {
        await _emailService.SendSwapRequestEmailAsync(dto);
        return Ok("Swap request email sent successfully.");
    }
}