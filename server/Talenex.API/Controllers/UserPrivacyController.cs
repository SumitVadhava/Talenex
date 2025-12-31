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
    public class UserPrivacyController : ControllerBase
    {
        private readonly IService<UserPrivacy> _service;
        private readonly IValidator<CreateUserPrivacyDto> _createValidator;
        private readonly IValidator<UpdateUserPrivacyDto> _updateValidator;


        public UserPrivacyController (IService<UserPrivacy> service,IValidator<CreateUserPrivacyDto> createValidator, IValidator<UpdateUserPrivacyDto> updateValidator)
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
        public async Task<IActionResult> Create(CreateUserPrivacyDto dto)
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

            var result = await _updateValidator.ValidateAsync(dto);

            if (!result.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    errors = result.Errors.Select(e => e.ErrorMessage)
                });
            }

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
