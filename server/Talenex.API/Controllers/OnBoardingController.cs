using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/onboarding")]
    [Authorize]
    public class OnBoardingController : ControllerBase
    {
        private readonly IOnboardingService _onboardingService;

        public OnBoardingController(IOnboardingService onboardingService)
        {
            _onboardingService = onboardingService;
        }

        [HttpPost]
        public async Task<IActionResult> CompleteOnboarding([FromBody] OnBoardingDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)
                             ?? User.FindFirst("sub");

            if (userIdClaim == null)
                return Unauthorized("UserId not found in token");

            var userId = Guid.Parse(userIdClaim.Value);

            
            await _onboardingService.CompleteOnboardingAsync(userId, dto);

            return Ok(new
            {
                message = "Onboarding completed successfully"
            });
        }
    }
}