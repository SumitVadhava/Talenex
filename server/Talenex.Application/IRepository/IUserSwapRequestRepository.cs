using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserSwapRequestRepository : IRepository<UserSwapRequest>
    {
        Task<List<UserSwapRequest>> GetMySwapRequestsAsync(Guid userProfileId);
    }

}
