using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.Validators
{
    public class CreateSwapRequestValidator : AbstractValidator<CreateSwapRequestDto>
    {
        public CreateSwapRequestValidator()
        {
            RuleFor(x => x.ReceiverId)
                .NotEmpty()
                .WithMessage("ReceiverId is required");

            RuleFor(x => x.SkillToOffer)
                .NotEmpty()
                .WithMessage("Skill to offer is required")
                .MaximumLength(100)
                .WithMessage("Skill to offer must not exceed 100 characters");

            RuleFor(x => x.SkillToLearn)
                .NotEmpty()
                .WithMessage("Skill to learn is required")
                .MaximumLength(100)
                .WithMessage("Skill to learn must not exceed 100 characters");

            RuleFor(x => x.ProposedTime)
                .NotEmpty()
                .WithMessage("At least one proposed time slot is required");


            RuleFor(x => x.DurationMinutes)
                .NotEmpty()
                .WithMessage("Duration must be between 15 and 480 minutes")
                .GreaterThan(0)
                .WithMessage("Duration must be greater than or equal to 15 minutes");
             

            RuleFor(x => x.Message)
                .MaximumLength(250)
                .When(x => !string.IsNullOrEmpty(x.Message))
                .WithMessage("Message must not exceed 250 characters");
        }
    }
}