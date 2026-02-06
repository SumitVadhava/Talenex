using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserReputationDto
    {
        public Guid Id { get; set; }

        public decimal AverageRating { get; set; } = 0;

        public List<string>? UserReview { get; set; }
        public int TotalReviews { get; set; } = 0;
        public int? TrustScore { get; set; }
        public List<string>? BadgesJson { get; set; }

        public int? TotalSwapsCompleted { get; set; } = 0;
    }
}