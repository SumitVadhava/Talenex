using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class SwapRequestResponseDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public string Role { get; set; } // Requester / Receiver

        [Required]
        public SwapUserDto Requester { get; set; }

        [Required]
        public SwapUserDto Receiver { get; set; }

        [Required,MaxLength(100)]
        public string SkillToOffer { get; set; }

        [Required, MaxLength(100)]
        public string SkillToLearn { get; set; }

        [Required]
        public string ProposedTime { get; set; }

        [Required]
        public int DurationMinutes { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        public DateTime? AcceptedAt { get; set; }

        public DateTime? CancelledAt { get; set; }

        public DateTime? CompleteAt { get; set; }
        public string? GoogleEventId { get; set; }
    }
}
