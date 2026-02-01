using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpdateSwapRequestDto
    {
        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

    }
}