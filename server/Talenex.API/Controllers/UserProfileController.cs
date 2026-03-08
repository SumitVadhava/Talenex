using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class UserProfileController : ControllerBase
    {
        private readonly IService<UserProfile> _service;
        private readonly IUserReviewRepository _userReviewRepository;
        private readonly IValidator<CreateUserProfileDto> _createValidator;
        private readonly IValidator<UpdateUserProfileDto> _updateValidator;

        public UserProfileController(IService<UserProfile> service, IUserReviewRepository userReviewRepository, IValidator<CreateUserProfileDto> createValidator, IValidator<UpdateUserProfileDto> updateValidator)
        {
            _service = service;
            _userReviewRepository = userReviewRepository;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(Guid id)
        {
            var user = await _service.GetByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateUserProfileDto dto)
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


            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserProfileDto dto)
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

            bool nameChanged = existing.FullName != dto.FullName;
            bool photoChanged = existing.ProfilePhotoUrl != dto.ProfilePhotoUrl;

            existing.FullName = dto.FullName;
            existing.Username = dto.Username;
            existing.Bio = dto.Bio;
            existing.ProfilePhotoUrl = dto.ProfilePhotoUrl;
            existing.Location = dto.Location;
            existing.Latitude = dto.Latitude;
            existing.Longitude = dto.Longitude;

            var updated = await _service.UpdateAsync(existing);

            if (nameChanged || photoChanged)
            {
                var reviews = await _userReviewRepository.GetByReviewerIdAsync(existing.Id);
                if (reviews != null && reviews.Any())
                {
                    foreach (var review in reviews)
                    {
                        if (nameChanged) review.ReviewerName = dto.FullName;
                        if (photoChanged) review.ReviewerAvatar = dto.ProfilePhotoUrl ?? string.Empty;
                        await _userReviewRepository.UpdateAsync(review);
                    }
                }
            }

            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted != null ? Ok() : NotFound();
        }
    }
}
