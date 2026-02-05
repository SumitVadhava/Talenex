using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Repositories;

public class UserReviewService : IUserReviewsService
{
    private readonly IService<UserProfile> _userProfileService;
    private readonly IUserReviewRepository _userReviewRepository;
    private readonly IUserReputationRepository _reputationRepository;

    public UserReviewService(
        IService<UserProfile> userProfileService,
        IUserReviewRepository userReviewRepository,
        IUserReputationRepository reputationRepository)
    {
        _userProfileService = userProfileService;
        _userReviewRepository = userReviewRepository;
        _reputationRepository = reputationRepository;
    }

    public async Task<List<UserReviews>> GetByUserIdAsync(Guid userId)
    {
        return await _userReviewRepository.GetByUserIdAsync(userId);
    }

    public async Task AddReviewAsync(CreateUserReviewDto dto)
    {
        var user = await _userProfileService.GetByIdAsync(dto.UserId);

        if (user == null)
        {
            throw new Exception("User not found");
        }

        var review = new UserReviews
        {
            Id = Guid.NewGuid(),
            UserId = user.UserId,
            ReviewerAvatar = dto.ReviewerAvatar,
            ReviewerName = dto.ReviewerName,
            Rating = dto.Rating,
            ReviewMsg = dto.ReviewMsg,
            CreatedAt = DateTime.UtcNow
        };

        // ✅ Save review
        await _userReviewRepository.AddAsync(review);

        // ✅ Update reputation
        var reputation = await _reputationRepository.GetByUserIdAsync(user.UserId);

        if (reputation == null)
        {
            // First review for this user → create new reputation
            reputation = new UserReputation
            {
                UserId = user.UserId,
                TotalReviews = 1,
                AverageRating = dto.Rating,
                TrustScore = (int)Math.Round((dto.Rating / 5m) * 100m)
            };

            await _reputationRepository.AddAsync(reputation);
        }
        else
        {
            var oldAvg = reputation.AverageRating;
            var oldCount = reputation.TotalReviews;

            var newCount = oldCount + 1;
            var newAvg = ((oldAvg * oldCount) + dto.Rating) / newCount;

            reputation.TotalReviews = newCount;
            reputation.AverageRating = newAvg;
            reputation.TrustScore = (int)Math.Round((newAvg / 5m) * 100m);

            await _reputationRepository.UpdateByUserIdAsync(reputation.UserId);
        }

    }


    //public async Task AddReviewAsync(CreateUserReviewDto dto)
    //{
    //    // 1. Get profile by PROFILE ID (not Users.Id)
    //    var profile = await _userProfileService.GetByIdAsync(dto.UserId);

    //    if (profile == null)
    //    {
    //        Console.WriteLine($"User profile with ID {dto.UserId} not found."); return;
    //        throw new Exception("User profile not found");
    //    }

    //    Console.WriteLine($"Found profile. Real UserId = {profile.UserId}");



    //    if (profile.UserId == null || profile.UserId == Guid.Empty)
    //    {
    //        Console.WriteLine("CRITICAL: profile.UserId is null or empty!");
    //        throw new Exception("Profile exists but has no linked UserId");
    //    }
    //    // 2. Extract REAL Users.Id
    //    var realUserId = profile.UserId;  // ⚠️ THIS must exist in Users.Id

    //    // 3. (Optional but smart) Validate user exists
    //    // var user = await _userRepository.GetByIdAsync(realUserId);
    //    // if (user == null) throw new Exception("User not found in Users table");

    //    // 4. Create review using USERS TABLE ID
    //    var review = new UserReviews
    //    {
    //        Id = Guid.NewGuid(),
    //        UserId = realUserId,   // ✅ FK-safe
    //        ReviewerAvatar = dto.ReviewerAvatar,
    //        ReviewerName = dto.ReviewerName,
    //        Rating = dto.Rating,
    //        ReviewMsg = dto.ReviewMsg,
    //        CreatedAt = DateTime.UtcNow
    //    };

    //    await _userReviewRepository.AddAsync(review);

    //    // 5. Update reputation using SAME Users.Id
    //    var reputation = await _reputationRepository.GetByUserIdAsync(realUserId);

    //    if (reputation == null)
    //    {
    //        reputation = new UserReputation
    //        {
    //            UserId = realUserId,   // ✅ SAME ID
    //            TotalReviews = 1,
    //            AverageRating = dto.Rating,
    //            TrustScore = (int)Math.Round((dto.Rating / 5m) * 100m)
    //        };

    //        await _reputationRepository.AddAsync(reputation);
    //    }
    //    else
    //    {
    //        var oldAvg = reputation.AverageRating;
    //        var oldCount = reputation.TotalReviews;

    //        var newCount = oldCount + 1;
    //        var newAvg = ((oldAvg * oldCount) + dto.Rating) / newCount;

    //        reputation.TotalReviews = newCount;
    //        reputation.AverageRating = newAvg;
    //        reputation.TrustScore = (int)Math.Round((newAvg / 5m) * 100m);

    //        await _reputationRepository.UpdateByUserIdAsync(realUserId);
    //    }
}