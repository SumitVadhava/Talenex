using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserPrivacyDto
    {
        //[Required]
        public Guid Id { get; set; }

        public bool IsProfilePublic { get; set; } = true;
        public bool ShowLocation { get; set; } = true;
        public bool ShowSkills { get; set; } = true;

        // example values: "everyone", "friends", "no-one"
        public string? AllowMessagesFrom { get; set; }

    }
}