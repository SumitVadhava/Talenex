using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class CreateUserPrivacyDto
    {
        public Guid UserId { get; set; }

        public bool IsProfilePublic { get; set; } = true;
        public bool ShowLocation { get; set; } = true;
        public bool ShowSkills { get; set; } = true;

        public bool AllowMessagesFrom { get; set; } = true;

    }
}