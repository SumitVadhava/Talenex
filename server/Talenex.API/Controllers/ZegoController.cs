using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/zego")]
    public class ZegoController : ControllerBase
    {
        private readonly IZegoTokenService _tokenService;

        public ZegoController(IZegoTokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [Authorize(AuthenticationSchemes = "TalenexJwt")]
        [HttpGet("token")]
        public IActionResult GetToken()
        {
            var userId = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value ?? User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
                return Unauthorized("Invalid token");

            var token = _tokenService.GenerateToken(userId);
            return Ok(new { token,userId });
        }

    }

}
