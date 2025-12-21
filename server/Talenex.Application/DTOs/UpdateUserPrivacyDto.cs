using System;
using System.Collections.Generic;   
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs
{
    public class UpdateUserPrivacyDto
    {
        public bool IsProfilePublic { get; set; }
        public bool ShowLocation { get; set; }
        public bool ShowSkills { get; set; }

        public string? AllowMessagesFrom { get; set; }
    }

}
