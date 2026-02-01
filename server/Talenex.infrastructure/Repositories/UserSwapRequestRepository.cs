using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserSwapRequestRepository : Repository<UserSwapRequest>,IUserSwapRequestRepository
    {

        public UserSwapRequestRepository(AppDBContext db) : base(db)
        {
           
        }


        public async Task<List<UserSwapRequest>> GetMySwapRequestsAsync(Guid userProfileId)
        {
            return await _table.Where(x =>
                    x.RequesterId == userProfileId || x.ReceiverId == userProfileId
                 )
                .Include(x => x.Requester)
                .Include(x => x.Receiver)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}
