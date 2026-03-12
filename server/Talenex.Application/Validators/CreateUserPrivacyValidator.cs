using FluentValidation;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.Validators
{
    public class CreateUserPrivacyValidator
        : AbstractValidator<CreateUserPrivacyDto>
    {
        public CreateUserPrivacyValidator()
        {  
            RuleFor(x => x.UserId)
                .NotEmpty()
                .WithMessage("UserId is required");


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
