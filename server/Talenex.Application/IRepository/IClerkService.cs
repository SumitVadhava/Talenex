using System.Threading.Tasks;
using Talenex.Application.DTOs.ResponseDtos;

namespace Talenex.Application.IRepository
{
    public interface IClerkService
    {
        Task<ClerkUserDto> GetUserAsync(string clerkUserId);

        Task DeleterUserAsync(string clerkUserId);
    }
}
