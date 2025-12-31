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
    public class UserNotificationPreferencesController : ControllerBase
    {
        private readonly IService<UserNotificationPreferences> _service;
        private readonly IValidator<CreateUserNotificationPreferencesDto> _createValidator;
        private readonly IValidator<UpdateUserNotificationPreferencesDto> _updateValidator;

        public UserNotificationPreferencesController(IService<UserNotificationPreferences> service, IValidator<CreateUserNotificationPreferencesDto> createValidator, IValidator<UpdateUserNotificationPreferencesDto> updateValidator)
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
        public async Task<IActionResult> Create(CreateUserNotificationPreferencesDto dto)
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

            var entity = new UserNotificationPreferences
            {
                UserId = dto.UserId,
                NotifyOnMessage = dto.NotifyOnMessage,
                NotifyOnSwapRequest = dto.NotifyOnSwapRequest,
                NotifyOnRatingReceived = dto.NotifyOnRatingReceived
            };

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserNotificationPreferencesDto dto)
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

            existing.NotifyOnMessage = dto.NotifyOnMessage;
            existing.NotifyOnSwapRequest = dto.NotifyOnSwapRequest;
            existing.NotifyOnRatingReceived = dto.NotifyOnRatingReceived;

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
