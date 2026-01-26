using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Xml;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Services;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    public class UserReputationController : ControllerBase
    {
        private readonly IService<UserReputation> _service;
        private readonly IValidator<CreateUserReputationDto> _createValidator;
        private readonly IValidator<UpdateUserReputationDto> _updateValidator;


        public UserReputationController(IService<UserReputation> service, IValidator<CreateUserReputationDto> createValidator, IValidator<UpdateUserReputationDto> updateValidator)
        {
            _service = service;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
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
            var result = await _createValidator.ValidateAsync(dto);
            if (!result.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = result.Errors.Select(e => e.ErrorMessage)
                });
            }
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

            var result = await _updateValidator.ValidateAsync(dto);
            if (!result.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = result.Errors.Select(e => e.ErrorMessage)
                });
            }

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