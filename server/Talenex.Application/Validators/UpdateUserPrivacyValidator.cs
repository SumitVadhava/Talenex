using FluentValidation;
using Talenex.Application.DTOs.UpdateDtos;

namespace Talenex.Application.Validators
{
    public class UpdateUserPrivacyValidator
        : AbstractValidator<UpdateUserPrivacyDto>
    {
        public UpdateUserPrivacyValidator()
        {

            RuleFor(x => x.AllowMessagesFrom)
                  .NotNull()
                  .WithMessage("Null not allow");

            RuleFor(x => x.ShowLocation)
               .NotNull()
               .WithMessage("Null not allow");

            RuleFor(x => x.IsProfilePublic)
              .NotNull()
              .WithMessage("Null not allow");

            RuleFor(x => x.ShowSkills)
             .NotNull()
             .WithMessage("Null not allow");
        }

    }
}
