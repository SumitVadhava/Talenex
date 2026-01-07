using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Talenex.Application.DTOs;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Services;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IService<User> _service;
        private readonly IUserService _userService;

        private readonly IValidator<UpdateUserDto> _updateValidator;


        public UserController(IService<User> service,IUserService userService)
        {
            _service = service;
            _userService = userService;
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

        [HttpGet("clerk/{clerkId}")]
        public async Task<IActionResult> GetByClerk(String clerkId)
        {
            var user = await _userService.GetByClerkIdAsync(clerkId);
            return user == null ? NotFound() : Ok(user);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateUserDto dto)
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

            existing.Email = dto.Email;
            existing.FirstName = dto.FirstName;
            existing.LastName = dto.LastName;
            existing.ImageUrl = dto.ImageUrl;

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