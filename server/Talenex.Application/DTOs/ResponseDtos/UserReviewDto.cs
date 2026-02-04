using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserReviewDto
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public string ReviewMsg { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}
