using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class CreateSwapRequestDto
    {

            [Required]
            public Guid RequesterId { get; set; }


            [Required]
            public Guid ReceiverId { get; set; }
            

            [Required]
            [MaxLength(100)]
            public string SkillToOffer { get; set; }

            [Required]
            [MaxLength(100)]
            public string SkillToLearn { get; set; }

            [Required]  
            public string ProposedTime { get; set; }

            [Required]
            public int DurationMinutes { get; set; }

            [MaxLength(250)]
            public string? Message { get; set; } = "";
        
    }
}
