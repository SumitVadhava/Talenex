using FluentValidation;
using Talenex.Application.DTOs;

namespace Talenex.Application.Validators
{
    public class UpdateUserPrivacyValidator
        : AbstractValidator<UpdateUserPrivacyDto>
    {
        public UpdateUserPrivacyValidator()
        {

            RuleFor(x => x.AllowMessagesFrom)
                 .Must(value =>
                     value.Equals("everyone", StringComparison.OrdinalIgnoreCase) ||
                     value.Equals("friends", StringComparison.OrdinalIgnoreCase) ||
                     value.Equals("no-one", StringComparison.OrdinalIgnoreCase)
                 )
                 .When(x => !string.IsNullOrWhiteSpace(x.AllowMessagesFrom))
                 .WithMessage("AllowMessagesFrom must be everyone, friends, or no-one");
        }

    }
}
