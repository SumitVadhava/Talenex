using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class AuthResponse
    {     
        public string Token { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
    }

}