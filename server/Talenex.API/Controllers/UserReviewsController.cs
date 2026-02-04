using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Talenex.Application.DTOs;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.Infrastructure.Services; 

namespace Talenex.API.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    [Route("api/[controller]")]
    public class UserReviewsController : ControllerBase
    {
        private readonly IService<UserPrivacy> _service;
        private readonly IUserReviewsService _userReviewService;

        public UserReviewsController(IUserReviewsService userReviewService)
        {
            _userReviewService = userReviewService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReviews()
            => Ok(await _service.GetAllAsync());

        [HttpPost("add")]
        public async Task<IActionResult> AddReview([FromBody] CreateUserReviewDto dto)
        {
            if (dto == null)
                return BadRequest("Invalid request body.");

            if (dto.Rating < 0 || dto.Rating > 5)
                return BadRequest("Rating must be between 0 and 5.");

            await _userReviewService.AddReviewAsync(dto);

            return Ok(new
            {
                message = "Review added successfully"
            });
        }

    }
}
