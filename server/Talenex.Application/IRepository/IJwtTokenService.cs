using System;

namespace Talenex.Application.IRepository
{
    public interface IJwtTokenService
    {
        string GenerateToken(string userId);
    }
}