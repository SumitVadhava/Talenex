using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Talenex.Application.Common.Enums;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.DTOs.ResponseDtos;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Services;


namespace Talenex.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = "TalenexJwt")]
    public class UserController : ControllerBase
    {
        private readonly IService<User> _service;
        private readonly IUserService _userService;

        private readonly IValidator<UpdateUserDto> _updateValidator;


        public UserController(IService<User> service,IUserService userService,IValidator<UpdateUserDto> updateValidator)
        {
            _service = service;
            _userService = userService;
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

        [HttpGet("clerk/{clerkId}")]
        public async Task<IActionResult> GetByClerk(String clerkId)
        {
            var user = await _userService.GetByClerkIdAsync(clerkId);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpGet("All")]
        public async Task<IActionResult> GetAllUsers([FromQuery] string[] include)
        {
            var includes = include
                .Select(i => Enum.TryParse<UserInclude>(i, true, out var parsed)
                    ? parsed
                    : (UserInclude?)null)
                .Where(i => i.HasValue)
                //.Select(i => i.Value)
                .Select(i => i!.Value)
                .ToList();

            var users = await _userService.GetAllUserAsync(includes);

            if (users == null || !users.Any())
                return Ok(new List<UserDataDto>());

            var response = users.Select(user =>
            {
                var dto = new UserDataDto
                {
                    UserId = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ImageUrl = user.ImageUrl,
                    CreatedAt = user.CreatedAt
                };

                foreach (var inc in includes)
                {
                    switch (inc)
                    {
                        case UserInclude.Profile:
                            dto.Profile = user.UserProfile == null ? null : new UserProfileDto
                            {
                                Id = user.UserProfile.Id,
                                FullName = user.UserProfile.FullName,
                                Username = user.UserProfile.Username,
                                Bio = user.UserProfile.Bio,
                                ProfilePhotoUrl = user.UserProfile.ProfilePhotoUrl ?? string.Empty,
                                Location = user.UserProfile.Location,
                                Latitude = user.UserProfile.Latitude,
                                Longitude = user.UserProfile.Longitude,
                            };
                            break;

                        case UserInclude.Skills:
                            dto.Skills = user.UserSkills == null ? null : new UserSkillsDto
                            {
                                Id = user.UserSkills.Id,
                                SkillsOffered = user.UserSkills.SkillsOffered,
                                SkillsWanted = user.UserSkills.SkillsWanted
                            };
                            break;

                        case UserInclude.Availability:
                            dto.Availability = user.UserAvailability == null ? null : new UserAvailabilityDto
                            {
                                Id = user.UserAvailability.Id,
                                AvailableOnWeekdays = user.UserAvailability.AvailableOnWeekdays,
                                AvailableOnWeekends = user.UserAvailability.AvailableOnWeekends,
                                PreferredSessionDuration = user.UserAvailability.PreferredSessionDuration,
                                PreferredSessionMode = user.UserAvailability.PreferredSessionMode,
                            };
                            break;

                        case UserInclude.Privacy:
                            dto.Privacy = user.UserPrivacy == null ? null : new UserPrivacyDto
                            {
                                Id = user.UserPrivacy.Id,
                                IsProfilePublic = user.UserPrivacy.IsProfilePublic,
                                ShowLocation = user.UserPrivacy.ShowLocation,
                                ShowSkills = user.UserPrivacy.ShowSkills,
                                AllowMessagesFrom = user.UserPrivacy.AllowMessagesFrom,
                            };
                            break;

                        case UserInclude.Reputation:
                            dto.Reputation = user.UserReputation == null ? null : new UserReputationDto
                            {
                                Id = user.UserReputation.Id,
                                AverageRating = user.UserReputation.AverageRating,
                                TotalReviews = user.UserReputation.TotalReviews,
                                TrustScore = user.UserReputation.TrustScore,
                                BadgesJson = string.IsNullOrEmpty(user.UserReputation.BadgesJson)
                                    ? null
                                    : System.Text.Json.JsonSerializer.Deserialize<List<string>>(user.UserReputation.BadgesJson),
                                TotalSwapsCompleted = user.UserReputation?.TotalSwapsCompleted ?? 0,
                            };
                            break;

                        case UserInclude.Notifications:
                            dto.Notifications = user.UserNotifications == null ? null : new UserNotificationPreferencesDto
                            {
                                Id = user.UserNotifications.Id,
                                NotifyOnMessage = user.UserNotifications.NotifyOnMessage,
                                NotifyOnRatingReceived = user.UserNotifications.NotifyOnRatingReceived,
                                NotifyOnSwapRequest = user.UserNotifications.NotifyOnSwapRequest,
                            };
                            break;
                        case UserInclude.Reviews:

                            dto.Reviews = user.UserReviews == null
                                ? new List<UserReviewDto>()
                                : user.UserReviews.Select(r => new UserReviewDto
                                {
                                    Id = r.Id,
                                    ReviewerAvatar = r.ReviewerAvatar,
                                    ReviewerName = r.ReviewerName,
                                    Rating = r.Rating,
                                    ReviewMsg = r.ReviewMsg,
                                }).ToList();

                            break;
                        case UserInclude.Favourites:
                            dto.Favourites = user.UserFavourites == null ? null : new UserFavouritesDto
                            {
                                Id = user.UserFavourites.Id,
                                FavIds = user.UserFavourites.FavIds
                            };

                            break;

                    }
                }

                return dto;
            });

            return Ok(response);
        }

        [HttpGet("Details")]
        public async Task<IActionResult> GetUser([FromQuery] string[] include)
        {
            var includes = include
                .Select(i => Enum.TryParse<UserInclude>(i, true, out var parsed)
                    ? parsed
                    : (UserInclude?)null)
                .Where(i => i.HasValue)
                .Select(i => i!.Value)
                .ToList();

            var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized("UserId not found in token");

            var userId = Guid.Parse(userIdClaim.Value);

            var user = await _userService.GetUserAsync(userId, includes);

            if (user == null)
                return NotFound("User not found");

            var response = new UserDataDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ImageUrl = user.ImageUrl,
                CreatedAt = user.CreatedAt
            };

            foreach (var inc in includes)
            {
                switch (inc)
                {
                    case UserInclude.Profile:
                        response.Profile = user.UserProfile == null ? null : new UserProfileDto
                        {
                            Id = user.UserProfile.Id,
                            FullName = user.UserProfile.FullName,
                            Username = user.UserProfile.Username,
                            Bio = user.UserProfile.Bio,
                            ProfilePhotoUrl = user.UserProfile.ProfilePhotoUrl ?? string.Empty,
                            Location = user.UserProfile.Location,
                            Latitude = user.UserProfile.Latitude,
                            Longitude = user.UserProfile.Longitude,
                        };
                        break;

                    case UserInclude.Skills:
                        response.Skills = user.UserSkills == null ? null : new UserSkillsDto
                        {
                            Id = user.UserSkills.Id,
                            SkillsOffered = user.UserSkills.SkillsOffered,
                            SkillsWanted = user.UserSkills.SkillsWanted
                        };
                        break;

                    case UserInclude.Availability:
                        response.Availability = user.UserAvailability == null ? null : new UserAvailabilityDto
                        {
                            Id = user.UserAvailability.Id,
                            AvailableOnWeekdays = user.UserAvailability.AvailableOnWeekdays,
                            AvailableOnWeekends = user.UserAvailability.AvailableOnWeekends,
                            PreferredSessionDuration = user.UserAvailability.PreferredSessionDuration,
                            PreferredSessionMode = user.UserAvailability.PreferredSessionMode,
                        };
                        break;

                    case UserInclude.Privacy:
                        response.Privacy = user.UserPrivacy == null ? null : new UserPrivacyDto
                        {
                            Id = user.UserPrivacy.Id,
                            IsProfilePublic = user.UserPrivacy.IsProfilePublic,
                            ShowLocation = user.UserPrivacy.ShowLocation,
                            ShowSkills = user.UserPrivacy.ShowSkills,
                            AllowMessagesFrom = user.UserPrivacy.AllowMessagesFrom,
                        };
                        break;

                    case UserInclude.Reputation:
                        response.Reputation = user.UserReputation == null ? null : new UserReputationDto
                        {
                            Id = user.UserReputation.Id,
                            AverageRating = user.UserReputation.AverageRating,
                            TotalReviews = user.UserReputation.TotalReviews,
                            TrustScore = user.UserReputation.TrustScore,
                            BadgesJson = string.IsNullOrEmpty(user.UserReputation.BadgesJson)
                                ? null
                                : System.Text.Json.JsonSerializer.Deserialize<List<string>>(user.UserReputation.BadgesJson),
                            TotalSwapsCompleted = user.UserReputation?.TotalSwapsCompleted ?? 0,

                        };
                        break;

                    case UserInclude.Notifications:
                        response.Notifications = user.UserNotifications == null ? null : new UserNotificationPreferencesDto
                        {
                            Id = user.UserNotifications.Id,
                            NotifyOnMessage = user.UserNotifications.NotifyOnMessage,
                            NotifyOnRatingReceived = user.UserNotifications.NotifyOnRatingReceived,
                            NotifyOnSwapRequest = user.UserNotifications.NotifyOnSwapRequest,
                        };
                        break;

                    case UserInclude.Reviews:
                        // Assuming UserReviews is a collection of review entities
                        response.Reviews = user.UserReviews == null
                                ? new List<UserReviewDto>()
                                : user.UserReviews.Select(r => new UserReviewDto
                                {
                                    Id = r.Id,
                                    ReviewerAvatar = r.ReviewerAvatar,
                                    ReviewerName = r.ReviewerName,
                                    Rating = r.Rating,
                                    ReviewMsg = r.ReviewMsg,
                                }).ToList();

                        break;

                    case UserInclude.Favourites:
                        response.Favourites = user.UserFavourites == null ? null : new UserFavouritesDto
                        {
                            Id = user.UserFavourites.Id,
                            FavIds = user.UserFavourites.FavIds
                        };

                        break;
                }
            }

            return Ok(response);
        }

        [HttpGet("Details/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserById(Guid id,[FromQuery] string[] include)
        {
            var includes = include
                .Select(i => Enum.TryParse<UserInclude>(i, true, out var parsed)
                    ? parsed
                    : (UserInclude?)null)
                .Where(i => i.HasValue)
                .Select(i => i!.Value)
                .ToList();


            var user = await _userService.GetUserAsync(id, includes);

            if (user == null)
                return NotFound("User not found");

            var response = new UserDataDto
            {
                UserId = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                ImageUrl = user.ImageUrl,
                CreatedAt = user.CreatedAt
            };

            foreach (var inc in includes)
            {
                switch (inc)
                {
                    case UserInclude.Profile:
                        response.Profile = user.UserProfile == null ? null : new UserProfileDto
                        {
                            Id = user.UserProfile.Id,
                            FullName = user.UserProfile.FullName,
                            Username = user.UserProfile.Username,
                            Bio = user.UserProfile.Bio,
                            ProfilePhotoUrl = user.UserProfile.ProfilePhotoUrl ?? string.Empty,
                            Location = user.UserProfile.Location,
                            Latitude = user.UserProfile.Latitude,
                            Longitude = user.UserProfile.Longitude,
                        };

                        break;

                    case UserInclude.Skills:
                        response.Skills = user.UserSkills == null ? null : new UserSkillsDto
                        {
                            Id = user.UserSkills.Id,
                            SkillsOffered = user.UserSkills.SkillsOffered,
                            SkillsWanted = user.UserSkills.SkillsWanted
                        };
                        break;

                    case UserInclude.Availability:
                        response.Availability = user.UserAvailability == null ? null : new UserAvailabilityDto
                        {
                            Id = user.UserAvailability.Id,
                            AvailableOnWeekdays = user.UserAvailability.AvailableOnWeekdays,
                            AvailableOnWeekends = user.UserAvailability.AvailableOnWeekends,
                            PreferredSessionDuration = user.UserAvailability.PreferredSessionDuration,
                            PreferredSessionMode = user.UserAvailability.PreferredSessionMode,
                        };
                        break;

                    case UserInclude.Privacy:
                        response.Privacy = user.UserPrivacy == null ? null : new UserPrivacyDto
                        {
                            Id = user.UserPrivacy.Id,
                            IsProfilePublic = user.UserPrivacy.IsProfilePublic,
                            ShowLocation = user.UserPrivacy.ShowLocation,
                            ShowSkills = user.UserPrivacy.ShowSkills,
                            AllowMessagesFrom = user.UserPrivacy.AllowMessagesFrom,
                        };
                        break;

                    case UserInclude.Reputation:
                        response.Reputation = user.UserReputation == null ? null : new UserReputationDto
                        {
                            Id = user.UserReputation.Id,
                            AverageRating = user.UserReputation.AverageRating,
                            TotalReviews = user.UserReputation.TotalReviews,
                            TrustScore = user.UserReputation.TrustScore,
                            BadgesJson = string.IsNullOrEmpty(user.UserReputation.BadgesJson)
                                ? null
                                : System.Text.Json.JsonSerializer.Deserialize<List<string>>(user.UserReputation.BadgesJson),
                            TotalSwapsCompleted = user.UserReputation?.TotalSwapsCompleted ?? 0,

                        };
                        break;

                    case UserInclude.Notifications:
                        response.Notifications = user.UserNotifications == null ? null : new UserNotificationPreferencesDto
                        {
                            Id = user.UserNotifications.Id,
                            NotifyOnMessage = user.UserNotifications.NotifyOnMessage,
                            NotifyOnRatingReceived = user.UserNotifications.NotifyOnRatingReceived,
                            NotifyOnSwapRequest = user.UserNotifications.NotifyOnSwapRequest,
                        };
                        break;

                    case UserInclude.Reviews:
                        response.Reviews = user.UserReviews == null
                                 ? new List<UserReviewDto>()
                                 : user.UserReviews.Select(r => new UserReviewDto
                                 {
                                     Id = r.Id,
                                     ReviewerAvatar = r.ReviewerAvatar,
                                     ReviewerName = r.ReviewerName,
                                     Rating = r.Rating,
                                     ReviewMsg = r.ReviewMsg,
                                 }).ToList();

                        break;
                    case UserInclude.Favourites:
                        response.Favourites = user.UserFavourites == null ? null : new UserFavouritesDto
                        {
                            Id = user.UserFavourites.Id,
                            FavIds = user.UserFavourites.FavIds
                        };

                        break;
                }
            }

            return Ok(response);
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