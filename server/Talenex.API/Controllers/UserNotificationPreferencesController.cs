using Microsoft.AspNetCore.Mvc;
using Talenex.Application.Services;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;
using Talenex.Application.DTOs;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserNotificationPreferencesController : ControllerBase
    {
        private readonly IService<UserNotificationPreferences> _service;

        public UserNotificationPreferencesController(IService<UserNotificationPreferences> service)
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
        public async Task<IActionResult> Create(CreateUserNotificationPreferencesDto dto)
        {
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
