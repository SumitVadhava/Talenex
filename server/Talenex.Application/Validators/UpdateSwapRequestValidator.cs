using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.UpdateDtos;

namespace Talenex.Application.Validators
{
    public class UpdateSwapRequestValidator : AbstractValidator<UpdateSwapRequestDto>
    {
        public UpdateSwapRequestValidator()
        {
            RuleFor(x => x.Status)
                .NotEmpty()
                .WithMessage("Status is required")
                .Must(BeValidStatus)
                .WithMessage("Status must be one of: Pending, Accepted, Completed, Cancelled.");
        }

        private bool BeValidStatus(string status)
        {
            var validStatuses = new[] { "Pending", "Accepted", "Completed","Cancelled" };
            return Array.Exists(validStatuses, s => s.Equals(status, StringComparison.OrdinalIgnoreCase));
        }
    }
}
