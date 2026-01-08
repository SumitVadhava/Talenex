using FluentValidation;
using Talenex.Application.DTOs.UpdateDtos;

namespace Talenex.Application.Validators
{
    public class UpdateUserValidator
        : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Email must be valid");

            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("FirstName is required")
                .MaximumLength(50).WithMessage("FirstName cannot exceed 50 characters");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("LastName is required")
                .MaximumLength(50).WithMessage("LastName cannot exceed 50 characters");

            RuleFor(x => x.ImageUrl)
                .NotEmpty().WithMessage("ImageUrl is required")
                .Must(value =>
                    Uri.TryCreate(value, UriKind.Absolute, out var uri) &&
                    (uri.Scheme == Uri.UriSchemeHttp ||
                     uri.Scheme == Uri.UriSchemeHttps)
                )
                .WithMessage("ImageUrl must be a valid http or https URL");
        }
    }
}
