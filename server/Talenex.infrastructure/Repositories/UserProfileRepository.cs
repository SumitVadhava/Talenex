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
    public class UserProfileRepository  : Repository<UserProfile>,IUserProfileRepository
    {
         public UserProfileRepository(AppDBContext db) : base(db) { }

        public async Task<UserProfile?> GetByUserIdAsync(Guid userId)
        {
            return await _table.FirstOrDefaultAsync(x => x.UserId == userId);
        }
    }
}