using Microsoft.AspNetCore.Mvc;
using Talenex.infrastructure.Services;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;
using Talenex.Application.DTOs;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSkillsController : ControllerBase
    {
        private readonly IService<UserSkills> _service;

        public UserSkillsController(IService<UserSkills> service)
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
        public async Task<IActionResult> Create(CreateUserSkillsDto dto)
        {
            var entity = new UserSkills
            {
                UserId = dto.UserId,
                SkillsOffered = dto.SkillsWanted,
                SkillsWanted = dto.SkillsWanted,
               
            };

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserSkillsDto dto)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null)
                return NotFound();

            if (dto.SkillsOffered != null)
                existing.SkillsOffered = dto.SkillsOffered;

            if (dto.SkillsWanted != null)
                existing.SkillsWanted = dto.SkillsWanted;

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