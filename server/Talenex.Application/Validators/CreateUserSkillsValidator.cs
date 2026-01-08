using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.Validators
{
    public class CreateUserSkillsValidator : AbstractValidator<CreateUserSkillsDto>
    {
        public CreateUserSkillsValidator() {
            RuleFor(x => x.UserId)
               .NotEmpty()
               .WithMessage("UserId is required.");

            //RuleFor(x => x.SkillsOffered)
            //    .MaximumLength(500)
            //    .When(x => !string.IsNullOrWhiteSpace(x.SkillsOffered))
            //    .WithMessage("SkillsOffered cannot exceed 500 characters.");

            //RuleFor(x => x.SkillsWanted)
            //    .MaximumLength(500)
            //    .When(x => !string.IsNullOrWhiteSpace(x.SkillsWanted))
            //    .WithMessage("SkillsWanted cannot exceed 500 characters.");

            //RuleFor(x => x)
            //    .Must(x =>
            //        !string.IsNullOrWhiteSpace(x.SkillsWanted))
            //    .WithMessage("At least one of SkillsOffered or SkillsWanted must be provided.");
        }
    }
}
