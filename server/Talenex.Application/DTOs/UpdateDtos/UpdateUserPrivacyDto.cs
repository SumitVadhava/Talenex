using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpdateUserPrivacyDto
    {
        public bool IsProfilePublic { get; set; } = true;
        public bool ShowLocation { get; set; } = true;
        public bool ShowSkills { get; set; } = true;

        public bool AllowMessagesFrom { get; set; } = true;
    }

}
