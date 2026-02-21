using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;
using Talenex.Application.Common.Enums;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/stream")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    public class ChatController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IUserService _userService;
        private readonly IUserProfileRepository _profileRepo;

        public ChatController(IChatService chatService, IUserService userService, IUserProfileRepository profileRepo)
        {
            _chatService = chatService;
            _userService = userService;
            _profileRepo = profileRepo;
        }

        [HttpGet("token")]
        public IActionResult GetToken()
        {
            var clerkUserId = User.FindFirst("sub")?.Value;
            if (string.IsNullOrEmpty(clerkUserId))
                return Unauthorized();

            var token = _chatService.GenerateStreamToken(clerkUserId);
            return Ok(new { token });
        }

        [HttpPost("user/upsert")]
        public async Task<IActionResult> UpsertUser([FromBody] UpdateStreamUserDto dto)
        {
            try
            {
                var clerkUserId = User.FindFirst("sub")?.Value;
                if (string.IsNullOrEmpty(clerkUserId))
                    return Unauthorized();

                await _chatService.UpsertStreamUserAsync(clerkUserId, dto.FullName, dto.ImageUrl);
                return Ok(new { message = "User upserted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("user/sync/{id}")]
        public async Task<IActionResult> SyncUserToStream(Guid id)
        {
            try
            {
                // 1. Try to find user directly (assuming id is UserId)
                var user = await _userService.GetUserAsync(id, new List<UserInclude> { UserInclude.Profile });

                // 2. If not found, try to find by ProfileId
                if (user == null)
                {
                    var profile = await _profileRepo.GetByIdAsync(id);
                    if (profile != null)
                    {
                        user = await _userService.GetUserAsync(profile.UserId, new List<UserInclude> { UserInclude.Profile });
                    }
                }

                if (user == null)
                    return NotFound(new { message = "User not found (checked both User and Profile IDs)" });

                var fullName = user.UserProfile?.FullName ?? $"{user.FirstName} {user.LastName}";
                var profilePic = user.UserProfile?.ProfilePhotoUrl ?? user.ImageUrl ?? "";

                await _chatService.UpsertStreamUserAsync(user.Id.ToString(), fullName, profilePic);

                return Ok(new { 
                    message = "User synchronized with Stream successfully",
                    userId = user.Id
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }
}
