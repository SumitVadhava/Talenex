using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpsertStreamUserDto
    {
        public string FullName { get; set; } = null!;
        public string ProfilePic { get; set; } = null!;
    }
}
