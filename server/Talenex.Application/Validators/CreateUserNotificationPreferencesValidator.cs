using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs;

namespace Talenex.Application.Validators
{
    public class CreateUserNotificationPreferencesValidator : AbstractValidator<CreateUserNotificationPreferencesDto>
    {
        public CreateUserNotificationPreferencesValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty()
                .WithMessage("UserId is required.");
            RuleFor(x => x)
                .Must(x =>
                    x.NotifyOnMessage ||
                    x.NotifyOnSwapRequest ||
                    x.NotifyOnRatingReceived)
                .WithMessage("At least one notification preference must be enabled.");
        }
    }
}
