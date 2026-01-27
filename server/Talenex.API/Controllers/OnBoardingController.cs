using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/onboarding")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
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
            var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(ClaimTypes.NameIdentifier);
                          

            if (userIdClaim == null)
                return Unauthorized("UserId not found in token");

            var userId = Guid.Parse(userIdClaim.Value);

            Console.WriteLine("-------------------------------");
            Console.WriteLine($"Received Onboarding DTO for UserId: {userId}");

            foreach (var claim in User.Claims)
            {
                Console.WriteLine($"CLAIM => {claim.Type} = {claim.Value}");
            }
            Console.WriteLine("-------------------------------");
            
            await _onboardingService.CompleteOnboardingAsync(userId, dto);

            return Ok(new
            {
                message = "Onboarding completed successfully"
            });
        }
    }
}