using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Services;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/user-fav")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    public class UserFavouritesController : ControllerBase
    {
        private readonly IService<UserFavourites> _service;


        public UserFavouritesController(IService<UserFavourites> service)
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

        [HttpPatch("upsert")]
        public async Task<IActionResult> UpsertFav([FromBody] UpsertUserFavouritesDto dto)
        {
            var userId = Guid.Parse(User.FindFirst("sub")?.Value ?? User.FindFirstValue(ClaimTypes.NameIdentifier));

            var existing = (await _service.GetAllAsync()).FirstOrDefault(x => x.UserId == userId);

            if (existing == null)
            {
                if (!dto.IsAdd)
                    return BadRequest("Cannot remove favourite because no favourites exist for this user.");

                var entity = new UserFavourites
                {
                    Id = Guid.NewGuid(),
                    UserId = userId,
                    FavIds = new List<Guid> { dto.FavId }
                };

                await _service.CreateAsync(entity);
                return Ok(entity);
            }
            else
            {
                if (dto.IsAdd)
                {
                    if (!existing.FavIds.Contains(dto.FavId))
                        existing.FavIds.Add(dto.FavId);
                }
                else
                {
                    existing.FavIds.Remove(dto.FavId);
                }

                var updated = await _service.UpdateAsync(existing);
                return Ok(updated);
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var deleted = await _service.DeleteAsync(id);
            return deleted != null ? Ok() : NotFound();
        }
    }
}
