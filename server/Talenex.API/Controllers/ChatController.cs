using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/stream")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }

        [HttpGet("token")]
        public IActionResult GetStreamToken()
        {
            try
            {
                var userId = User.FindFirst("sub")?.Value ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

                var token = _chatService.GenerateStreamToken(userId);

                return Ok(new { token });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }

        }

        [HttpPost("user/upsert")]
        public async Task<IActionResult> UpsertStreamUser([FromBody] UpsertStreamUserDto request)
        {
            try
            {
                var userId = User.FindFirst("sub")?.Value
                             ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrWhiteSpace(userId))
                    return Unauthorized(new { message = "User id not found in token" });

                await _chatService.UpsertStreamUserAsync(userId, request.FullName, request.ProfilePic);

                return Ok(new { message = "Stream user upserted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }

    }
}