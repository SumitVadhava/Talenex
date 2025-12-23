using Microsoft.AspNetCore.Mvc;
using Talenex.infrastructure.Services;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;
using Talenex.Application.DTOs;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserPrivacyController : ControllerBase
    {
        private readonly IService<UserPrivacy> _service;

        public UserPrivacyController (IService<UserPrivacy> service)
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
        public async Task<IActionResult> Create(CreateUserPrivacyDto dto)
        {
            var entity = new UserPrivacy
            {
                UserId = dto.UserId,
                IsProfilePublic = dto.IsProfilePublic,
                ShowLocation = dto.ShowLocation,
                ShowSkills = dto.ShowSkills,
                AllowMessagesFrom = dto.AllowMessagesFrom ?? "everyone"

            };

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserPrivacyDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            existing.IsProfilePublic = dto.IsProfilePublic;
            existing.ShowLocation = dto.ShowLocation;
            existing.ShowSkills = dto.ShowSkills;
            existing.AllowMessagesFrom = dto.AllowMessagesFrom ?? existing.AllowMessagesFrom;

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
