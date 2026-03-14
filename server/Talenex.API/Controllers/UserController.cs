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
        private readonly IClerkService _clerkService;
        private readonly IUserService _userService;

        private readonly IValidator<UpdateUserDto> _updateValidator;


        public UserController(IService<User> service,IUserService userService,IClerkService clerkService,IValidator<UpdateUserDto> updateValidator)
        {
            _service = service;
            _userService = userService;
            _clerkService = clerkService;
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
                    CreatedAt = user.CreatedAt,
                    isPremium = user.isPremium,
                    PremiumPlan = user.PremiumPlan
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
                                    ReviewerId = r.ReviewerId,
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
                CreatedAt = user.CreatedAt,
                isPremium = user.isPremium,
                PremiumPlan = user.PremiumPlan
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
                                    ReviewerId = r.ReviewerId,
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
                CreatedAt = user.CreatedAt,
                isPremium = user.isPremium,
                PremiumPlan = user.PremiumPlan
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
                                     ReviewerId = r.ReviewerId,
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
            var existingUser = await _service.GetByIdAsync(id);

            if (existingUser == null)
                return NotFound(new {Message = "User not found"});

            var clerkUserId = existingUser.ClerkUserId;

            if (clerkUserId == null)
                return NotFound(new {Message = "User's ClerkId is not found"});

            try
            {
                await _clerkService.DeleterUserAsync(clerkUserId);
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"[UserController] Clerk deletion failed for {clerkUserId}: {ex.Message}");
            }

            var deleted = await _service.DeleteAsync(id);

            return deleted!= null ? Ok() : NotFound();
        }


        [HttpPost("AiMatch")]
        public async Task<IActionResult> AiMatch(
            [FromBody] Talenex.Application.DTOs.CreateDtos.AIMatchRequestDto dto,
            [FromServices] IHttpClientFactory httpClientFactory,
            [FromServices] IConfiguration configuration)
        {
            var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            Guid? requestingUserId = null;
            if (userIdClaim != null)
            {
                if (Guid.TryParse(userIdClaim.Value, out var uid)) { requestingUserId = uid; }
                else
                {
                    var clerkUser = await _userService.GetByClerkIdAsync(userIdClaim.Value);
                    if (clerkUser != null) requestingUserId = clerkUser.Id;
                }
            }

            if (dto.RequiredSkills == null || dto.RequiredSkills.Count == 0)
                return BadRequest(new { error = "RequiredSkills cannot be empty." });

            var topN = Math.Clamp(dto.TopN, 1, 20);
            
            // Split multi-word skills into individual terms for more lenient matching (e.g. "react js" -> "react", "js")
            var searchWords = dto.RequiredSkills
                .SelectMany(s => s.Split(new[] { ' ', ',', '.', '-' }, StringSplitOptions.RemoveEmptyEntries))
                .Select(w => w.Trim().ToLowerInvariant())
                .Distinct()
                .Where(w => w.Length > 1) 
                .ToList();

            if (searchWords.Count == 0 && dto.RequiredSkills.Any())
            {
                searchWords = dto.RequiredSkills.Select(s => s.Trim().ToLowerInvariant()).ToList();
            }

            // 2. Fetch all users
            var allIncludes = new List<Talenex.Application.Common.Enums.UserInclude>
            {
                Talenex.Application.Common.Enums.UserInclude.Profile,
                Talenex.Application.Common.Enums.UserInclude.Skills,
                Talenex.Application.Common.Enums.UserInclude.Reputation,
                Talenex.Application.Common.Enums.UserInclude.Availability,
            };
            var allUsers = await _userService.GetAllUserAsync(allIncludes);

            // 3. Filter
            var filteredUsers = allUsers
                .Where(u =>
                    (requestingUserId == null || u.Id != requestingUserId) && 
                    u.UserSkills?.SkillsOffered != null &&
                    u.UserSkills.SkillsOffered.Any(s =>
                    {
                        var title = (s.Title ?? "").ToLowerInvariant();
                        var cat = (s.Category ?? "").ToLowerInvariant();
                        var desc = (s.Description ?? "").ToLowerInvariant();
                        
                        return searchWords.Any(word => 
                            title.Contains(word) || 
                            cat.Contains(word) || 
                            desc.Contains(word)
                        );
                    })
                )
                .ToList();

            if (filteredUsers.Count == 0)
            {
                Console.WriteLine($"[AiMatch] No users found offering matching keywords: {string.Join(", ", searchWords)}");
                return Ok(new { matchedIds = Array.Empty<string>() });
            }

            var names = string.Join(", ", filteredUsers.Select(u => u.UserProfile?.FullName ?? u.Email));
            Console.WriteLine($"[AiMatch] Found {filteredUsers.Count} candidate(s) for '{string.Join(", ", searchWords)}': {names}");

            // 4. Build summaries (Enhanced with more quality signals)
            var userSummaries = filteredUsers.Select(u => new
            {
                id = u.Id.ToString(),
                name = u.UserProfile?.FullName ?? $"{u.FirstName} {u.LastName}",
                isPremium = u.isPremium,
                offeredSkills = u.UserSkills!.SkillsOffered!
                    .Select(s => new { title = s.Title, level = s.Level, category = s.Category, hasCertificate = !string.IsNullOrEmpty(s.CertificateURL) })
                    .ToList(),
                wantedSkills = u.UserSkills.SkillsWanted?
                    .Select(s => s.Name ?? "")
                    .ToList() ?? new List<string>(),
                rating = u.UserReputation?.AverageRating ?? 0,
                totalReviews = u.UserReputation?.TotalReviews ?? 0,
                totalSwaps = u.UserReputation?.TotalSwapsCompleted ?? 0,
                bio = (u.UserProfile?.Bio ?? "").Length > 200
                    ? u.UserProfile!.Bio!.Substring(0, 200)
                    : (u.UserProfile?.Bio ?? "")
            }).ToList();

            var userSummariesJson = System.Text.Json.JsonSerializer.Serialize(userSummaries);
            var skillsList = string.Join(", ", dto.RequiredSkills);

            var systemPrompt = @"You are the matching engine for Talenex. Return ONLY a raw JSON array of user IDs (strings) representing the best partners.
RANKING CRITERIA:
1. Skills: How well their offered skills match keywords.
2. Certs: Prefer users with certificates (hasCertificate: true).
3. Record: Higher totalSwaps and totalReviews are better.
4. Quality: Higher average ratings.
5. Status: Premium users get a slight priority.
FORMAT: JSON array only [""id1"", ""id2""]. NO text/reasoning.";

            var userPrompt = $@"Requirements: {skillsList}
Candidates: {userSummariesJson}
Return top {topN} IDs in best order:";

            // 5. Call Groq API
            var groqApiKey = configuration["Groq:ApiKey"];
            var groqRequest = new
            {
                model = "llama-3.3-70b-versatile",
                messages = new[]
                {
                    new { role = "system", content = systemPrompt },
                    new { role = "user", content = userPrompt }
                },
                temperature = 0.1,
                max_tokens = 2048
            };

            var httpClient = httpClientFactory.CreateClient();
            httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {groqApiKey}");

            var requestJson = System.Text.Json.JsonSerializer.Serialize(groqRequest);
            var content = new System.Net.Http.StringContent(requestJson, System.Text.Encoding.UTF8, "application/json");

            HttpResponseMessage groqResponse;
            try
            {
                groqResponse = await httpClient.PostAsync("https://api.groq.com/openai/v1/chat/completions", content);
            }
            catch (Exception ex)
            {
                return StatusCode(502, new { error = "Failed to reach Groq API.", details = ex.Message });
            }

            if (!groqResponse.IsSuccessStatusCode)
            {
                var errorBody = await groqResponse.Content.ReadAsStringAsync();
                return StatusCode(502, new { error = "Groq API returned an error.", details = errorBody });
            }

            var groqBody = await groqResponse.Content.ReadAsStringAsync();
            string groqText;
            try
            {
                using var doc = System.Text.Json.JsonDocument.Parse(groqBody);
                groqText = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString() ?? "";
                
                Console.WriteLine($"[AiMatch] Groq Raw Response: {groqText}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[AiMatch] JSON Parse Error: {ex.Message}");
                return StatusCode(502, new { error = "Failed to parse Groq response structure." });
            }

            // 6. Extract JSON array from Groq text (Groq sometimes wraps response in markdown)
            var jsonStart = groqText.IndexOf('[');
            var jsonEnd = groqText.LastIndexOf(']');
            List<string> matchedIds = new List<string>();
            
            if (jsonStart >= 0 && jsonEnd > jsonStart)
            {
                var rawArray = groqText.Substring(jsonStart, jsonEnd - jsonStart + 1);
                try
                {
                    matchedIds = System.Text.Json.JsonSerializer.Deserialize<List<string>>(rawArray) ?? new List<string>();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[AiMatch] Array Parse Error: {ex.Message} for text: {rawArray}");
                }
            }
            else
            {
                Console.WriteLine($"[AiMatch] No '[' or ']' found in AI response.");
            }

            // Validate returned IDs are actually in our filtered set (Robust comparison)
            var validIds = filteredUsers.Select(u => u.Id.ToString().ToLowerInvariant()).ToHashSet();
            
            var finalIds = matchedIds
                .Select(id => id.Trim().ToLowerInvariant())
                .Where(id => validIds.Contains(id))
                .Take(topN)
                .ToList();

            Console.WriteLine($"[AiMatch] Successfully matched {finalIds.Count} ID(s) from {matchedIds.Count} total IDs returned by AI.");
            
            return Ok(new { matchedIds = finalIds });
        }
    }
}