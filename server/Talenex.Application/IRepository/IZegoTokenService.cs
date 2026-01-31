using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.IRepository
{
    public interface IZegoTokenService
    {
        string GenerateToken(string userId, int expireSeconds = 3600);
    }
}
