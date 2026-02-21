using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class SwapUserDto
    {   
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string ProfilePhotoUrl { get; set; }
    }

}