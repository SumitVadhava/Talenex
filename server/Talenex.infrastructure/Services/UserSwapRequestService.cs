using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;

namespace Talenex.infrastructure.Services
{
    public class UserSwapRequestService : IUserSwapRequestService
    {
        private readonly IUserSwapRequestRepository _swapRepo;
        private readonly IUserProfileRepository _userProfileRepo;

        public UserSwapRequestService(
            IUserSwapRequestRepository swapRepo,
            IUserProfileRepository userProfileRepo)
        {
            _swapRepo = swapRepo;
            _userProfileRepo = userProfileRepo;
        }

        public async Task<List<UserSwapRequest>> GetMySwapRequestsAsync(Guid userId)
        {
            var profile = await _userProfileRepo.GetByUserIdAsync(userId);

            if (profile == null)
                return new List<UserSwapRequest>();

            return await _swapRepo.GetMySwapRequestsAsync(profile.Id);
        }
    }
}
