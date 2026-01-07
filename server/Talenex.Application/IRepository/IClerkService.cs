using System.Threading.Tasks;
using Talenex.Application.DTOs;

namespace Talenex.Application.IRepository
{
    public interface IClerkService
    {
        Task<ClerkUserDto> GetUserAsync(string clerkUserId);
    }
}
