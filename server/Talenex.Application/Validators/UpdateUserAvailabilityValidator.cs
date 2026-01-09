using FluentValidation;
using Talenex.Application.DTOs.UpdateDtos;

namespace Talenex.Application.Validators
{
    public class UpdateUserAvailabilityValidator: AbstractValidator<UpdateUserAvailabilityDto>
    {
        public UpdateUserAvailabilityValidator()
        {

            RuleFor(x => x)
                .Must(x => x.AvailableOnWeekdays || x.AvailableOnWeekends)
                .WithMessage("User must be available on weekdays or weekends");

           
            RuleFor(x => x.PreferredSessionDuration)
                .GreaterThan(0)
                .LessThanOrEqualTo(480)
                .When(x => x.PreferredSessionDuration.HasValue)
                .WithMessage("PreferredSessionDuration must be between 1 and 480 minutes");

            RuleFor(x => x.PreferredSessionMode)
                .NotEmpty()
                .WithMessage("PreferredSessionMode is required")
                .Must(mode =>
                    mode.Equals("online", StringComparison.OrdinalIgnoreCase) ||  mode.Equals("offline", StringComparison.OrdinalIgnoreCase)
                ).WithMessage("PreferredSessionMode must be online, offline, or hybrid");
        }
    }
}
