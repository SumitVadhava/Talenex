using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Application.IRepository;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = "Clerk")]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly IClerkService _clerkService;
        private readonly IUserService _userService;

        private readonly IJwtTokenService _jwtTokenService;

        public AuthController(IClerkService clerkService, IUserService userService, IJwtTokenService jwtTokenService)
        {
            _clerkService = clerkService;
            _userService = userService;
            _jwtTokenService = jwtTokenService;
        }

        // [Authorize]
        [HttpPost]
        public async Task<IActionResult> RegisterUser()
        {
            //Console.WriteLine("Called auth");
            //foreach (var claim in User.Claims)
            //{
            //    Console.WriteLine($"{claim.Type} : {claim.Value}");
            //}

            //TOKEN IS ALREADY DECODED HERE

            var clerkUserId = User.FindFirstValue("id");
            //Console.WriteLine($"{clerkUserId}");
            var email = User.FindFirstValue("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress");
            //Console.WriteLine(email);
            var firstName = User.FindFirstValue("first_name");
            //Console.WriteLine(firstName);
            var lastName = User.FindFirstValue("last_name");
            //Console.WriteLine(lastName);
            var imageUrl = User.FindFirstValue("image_url");
            //Console.WriteLine(imageUrl);



            // CALL CLERK API
            var clerkUser = await _clerkService.GetUserAsync(clerkUserId);

            var createdAt = DateTimeOffset
                .FromUnixTimeMilliseconds(clerkUser.Created_At)
                .UtcDateTime
                .AddHours(5)
                .AddMinutes(30);


            var lastLoginAt = clerkUser.Last_Sign_In_At != null
                ? DateTimeOffset.FromUnixTimeMilliseconds(
                    clerkUser.Last_Sign_In_At.Value).UtcDateTime.AddHours(5).AddMinutes(30)
                : (DateTime?)null;

            Console.WriteLine(clerkUserId, email, firstName, lastName, imageUrl, createdAt, lastLoginAt);

            var user = await _userService.RegisterOrLoginUser(
                clerkUserId,
                email,
                firstName,
                lastName,
                imageUrl,
                createdAt,
                lastLoginAt
            );

            if (user == null)
                return Unauthorized();

            Console.WriteLine("------------------------");
            Console.WriteLine(user.Id); 
            Console.WriteLine(user.ClerkUserId);
            Console.WriteLine(user.Email);
            Console.WriteLine(user.FirstName);
            Console.WriteLine(user.LastName);
            Console.WriteLine(user.ImageUrl);
            Console.WriteLine(user.CreatedAt);
            Console.WriteLine(user.LastLoginAt);
            Console.WriteLine("------------------------");



            var token = _jwtTokenService.GenerateToken(user.Id.ToString());

            Console.WriteLine($"Generated JWT Token: {token}");

            return Ok(new { token, userId = user.Id, Message = "User registered/logged in successfully" });
        }
    }
}