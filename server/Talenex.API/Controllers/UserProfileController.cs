using Microsoft.AspNetCore.Mvc;
using Talenex.infrastructure.Services;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;
using Talenex.Application.DTOs;
using FluentValidation;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly IService<UserProfile> _service;
        private readonly IValidator<CreateUserProfileDto> _createvalidator;
        private readonly IValidator<UpdateUserProfileDto> _updatevalidator;

        public UserProfileController(IService<UserProfile> service,IValidator<CreateUserProfileDto> createvalidator, IValidator<UpdateUserProfileDto> updatevalidator)
        {
            _service = service;
            _createvalidator = createvalidator;
            _updatevalidator = updatevalidator;
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
        public async Task<IActionResult> Create(CreateUserProfileDto dto)
        {
            var entity = new UserProfile
            {
                UserId = dto.UserId,
                FullName = dto.FullName,
                Username = dto.Username,
                Bio = dto.Bio,
                ProfilePhotoUrl = dto.ProfilePhotoUrl,
                Location = dto.Location,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,

            };

            var result = await _createvalidator.ValidateAsync(dto);

            if (!result.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = result.Errors.Select(e => e.ErrorMessage)
                });
            }

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserProfileDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            existing.FullName = dto.FullName;
            existing.Username = dto.Username;
            existing.Bio = dto.Bio;
            existing.ProfilePhotoUrl = dto.ProfilePhotoUrl;
            existing.Location = dto.Location;
            existing.Latitude = dto.Latitude;
            existing.Longitude = dto.Longitude;


            var result = await _updatevalidator.ValidateAsync(dto);

            if (!result.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = result.Errors.Select(e => e.ErrorMessage)
                });
            }

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
