using FluentValidation;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.Validators
{
    public class CreateUserProfileValidator : AbstractValidator<CreateUserProfileDto>
    {
        public CreateUserProfileValidator()
        {
            RuleFor(x => x.UserId)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("UserId Field is required")
                .NotEmpty().WithMessage("UserId cannot be empty");

            RuleFor(x => x.FullName)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("Full Name is required")
                .NotEmpty().WithMessage("Full Name cannort be emoty");

            RuleFor(x => x.Username)
                .Cascade(CascadeMode.Stop)
                .NotNull().WithMessage("UserName Field is required")
                .NotEmpty().WithMessage("UserName cannot be empty");

            RuleFor(x => x.Bio)
                .NotEmpty().WithMessage("Bio is not empty")
                .MaximumLength(500).WithMessage("Bio is too long!(max 500 characters allowed)");

            RuleFor(x => x.ProfilePhotoUrl)
               .Cascade(CascadeMode.Stop)
               .NotNull().WithMessage("ProfilePhotoUrl field is required")
               .NotEmpty().WithMessage("ProfilePhotoUrl cannot be empty")
               .Must(url =>
                   Uri.TryCreate(url, UriKind.Absolute, out var uri) &&
                   (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps)
               )
               .WithMessage("URL must be a valid http or https URL");


            RuleFor(x => x.Location)
              .Cascade(CascadeMode.Stop)
              .NotNull().WithMessage("Location Field is required")
              .NotEmpty().WithMessage("Location cannot be empty");


        }
    }
}
