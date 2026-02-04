using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserReputationRepository  : Repository<UserReputation>
    {
         public UserReputationRepository(AppDBContext db) : base(db) { }

        public async Task<UserReputation?> GetByUserIdAsync(Guid userId)
        {
            return await _table.FirstOrDefaultAsync(x => x.UserId == userId);
                
        }

    }
}