using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.IRepository
{
    public interface IUserSwapRequestService
    {
        Task<List<UserSwapRequest>> GetMySwapRequestsAsync(Guid userId);
    }

}