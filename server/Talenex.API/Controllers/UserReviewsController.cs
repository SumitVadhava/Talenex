using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Talenex.Application.DTOs;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Repositories;
using Talenex.Infrastructure.Services; 

namespace Talenex.API.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    [Route("api/[controller]")]
    public class UserReviewsController : ControllerBase
    {
        private readonly IService<UserReviews> _service;
        private readonly IUserReviewsService _userReviewService;

        public UserReviewsController(IService<UserReviews> service,IUserReviewsService userReviewService)
        {
            _service = service;
            _userReviewService = userReviewService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserIdAsync(Guid userId)
        {
            var reviews = await _userReviewService.GetByUserIdAsync(userId);
            return Ok(reviews);
        }


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