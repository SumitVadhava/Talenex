using Microsoft.AspNetCore.Mvc;
using Talenex.infrastructure.Services;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;
using FluentValidation;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.DTOs.UpdateDtos;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAvailbilityController : ControllerBase
    {
        private readonly IService<UserAvailability> _service;
        private readonly IValidator<CreateUserAvailabilityDto> _createValidator;
        private readonly IValidator<UpdateUserAvailabilityDto> _updateValidator;


        public UserAvailbilityController(IService<UserAvailability> service, IValidator<CreateUserAvailabilityDto> createValidator, IValidator<UpdateUserAvailabilityDto> updateValidator)
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
        public async Task<IActionResult> Create(CreateUserAvailabilityDto dto)
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

            var entity = new UserAvailability
            {
                UserId = dto.UserId,
                AvailableOnWeekdays = dto.AvailableOnWeekdays,
                AvailableOnWeekends = dto.AvailableOnWeekends,
                PreferredSessionDuration = dto.PreferredSessionDuration,
                PreferredSessionMode = dto.PreferredSessionMode ?? "online",

            };
  

            var created = await _service.CreateAsync(entity);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserAvailabilityDto dto)
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

            existing.AvailableOnWeekdays = dto.AvailableOnWeekdays;
            existing.AvailableOnWeekends = dto.AvailableOnWeekends;
            existing.PreferredSessionDuration = dto.PreferredSessionDuration;
            existing.PreferredSessionMode = dto.PreferredSessionMode ?? existing.PreferredSessionMode;

           

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
