using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class CreateUserReviewDto
    {
        public Guid UserId { get; set; }

        [Required]
        [Range(0,5)]
        public int Rating { get; set; }
        public string ReviewMsg { get; set; } = string.Empty;
    }
}
