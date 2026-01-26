using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Talenex.Application.IRepository;
using Talenex.infrastructure.Data;
using Talenex.Domain.Entities;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/auth/test-login")]
    public class AuthTestController : ControllerBase
    {
        private readonly AppDBContext _db;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IWebHostEnvironment _env;

        public AuthTestController(
            AppDBContext db,
            IJwtTokenService jwtTokenService,
            IWebHostEnvironment env)
        {
            _db = db;
            _jwtTokenService = jwtTokenService;
            _env = env;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> LoginUser(string email, string password)
        {
            if (!_env.IsDevelopment())
                return Forbid("Test login is disabled in production");

            var user = await _db.User.AsNoTracking().FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return Unauthorized("Invalid email or password");
         

            var token = _jwtTokenService.GenerateToken(user.Id.ToString());

            return Ok(new
            {
                token,
                message = "Test login successful",     
            });
        }
    }
}