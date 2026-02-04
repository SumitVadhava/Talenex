using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Repositories;

public class UserReviewService : IUserReviewsService
{
    private readonly IUserReviewRepository _userReviewRepository;
    private readonly IUserReputationRepository _reputationRepository;

    public UserReviewService(
        IUserReviewRepository userReviewRepository,
        IUserReputationRepository reputationRepository)
    {
        _userReviewRepository = userReviewRepository;
        _reputationRepository = reputationRepository;
    }

    public async Task AddReviewAsync(CreateUserReviewDto dto)
    {
        var review = new UserReviews
        {
            Id = Guid.NewGuid(),
            UserId = dto.UserId,
            ReviewerAvatar = dto.ReviewerAvatar,
            ReviewerName = dto.ReviewerName,
            Rating = dto.Rating,
            ReviewMsg = dto.ReviewMsg,
            CreatedAt = DateTime.UtcNow
        };

        // ✅ Save review
        await _userReviewRepository.AddAsync(review);

        // ✅ Update reputation
        var reputation = await _reputationRepository.GetByUserIdAsync(dto.UserId);

        if (reputation == null)
        {
            var avg = dto.Rating;
            var count = 1;
            var trustScore = (int)Math.Round((avg / 5.0) * 100);

            var newReputation = new UserReputation
            {
                Id = Guid.NewGuid(),
                UserId = dto.UserId,
                AverageRating = avg,
                TotalReviews = count,
                TrustScore = trustScore,
                BadgesJson = "[]"
            };

            await _reputationRepository.AddAsync(newReputation);
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

            await _reputationRepository.UpdateAsync(reputation);
        }
    }
}