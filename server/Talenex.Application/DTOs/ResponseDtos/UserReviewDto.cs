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

        public Guid? ReviewerId { get; set; }

        public string ReviewerAvatar { get; set; }

        public string ReviewerName { get; set; }

        public int Rating { get; set; }
        public string ReviewMsg { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
