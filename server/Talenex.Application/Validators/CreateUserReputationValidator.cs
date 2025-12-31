using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs;

namespace Talenex.Application.Validators
{
    internal class CreateUserReputationValidator : AbstractValidator<CreateUserReputationDto>
    {
        public CreateUserReputationValidator() {
            RuleFor(x => x.UserId)
               .NotEmpty()
               .WithMessage("UserId is required.");

            RuleFor(x => x.AverageRating)
                .GreaterThanOrEqualTo(0)
                .LessThanOrEqualTo(5)
                .WithMessage("AverageRating must be between 0 and 5.");

            RuleFor(x => x.TotalReviews)
                .GreaterThanOrEqualTo(0)
                .WithMessage("TotalReviews cannot be negative.");

            RuleFor(x => x.TrustScore)
                .InclusiveBetween(0, 100)
                .When(x => x.TrustScore.HasValue)
                .WithMessage("TrustScore must be between 0 and 100.");

            RuleFor(x => x.BadgesJson)
                .Must(badges => badges == null || badges.All(b => !string.IsNullOrWhiteSpace(b)))
                .WithMessage("Badges cannot contain empty or null values.");
        }
    }
}
