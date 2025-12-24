using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Services;

namespace Talenex.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/auth")]
    public class AuthController : Controller
    {
        private readonly ClerkService _clerkService;
        private readonly UserService _userService;

        public AuthController(ClerkService clerkService, UserService userService)
        {
            _clerkService = clerkService;
            _userService = userService;
        }

        [Authorize]
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

            await _userService.RegisterOrLoginUser(
                clerkUserId,
                email,
                firstName,
                lastName,
                imageUrl,
                createdAt,
                lastLoginAt
            );

            return Ok("User authorized...");
        }


    }
}