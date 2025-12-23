using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Xml;
using Talenex.Application.DTOs;
using Talenex.Application.IRepository;
using Talenex.infrastructure.Services;
using Talenex.Domain.Entities;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserReputationController : ControllerBase
    {
        private readonly IService<UserReputation> _service;

        public UserReputationController(IService<UserReputation> service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _service.GetByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserReputationDto dto)
        {
            var entity = new UserReputation
            {
                UserId = dto.UserId,
                AverageRating = dto.AverageRating,
                TotalReviews = dto.TotalReviews,
                TrustScore = dto.TrustScore,

                BadgesJson = dto.BadgesJson == null ? null: JsonSerializer.Serialize(dto.BadgesJson)


            };

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserReputationDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            existing.AverageRating = dto.AverageRating;

            existing.TotalReviews = dto.TotalReviews;

            if (dto.TrustScore != null)
                existing.TrustScore = dto.TrustScore;

            if (dto.BadgesJson != null)
                existing.BadgesJson = JsonSerializer.Serialize(dto.BadgesJson);


            return Ok(await _service.UpdateAsync(existing));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted != null ? Ok() : NotFound();
        }
    }
}