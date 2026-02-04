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
    public class UserReviewRepository : Repository<UserReviews>, IUserReviewRepository
    {

        public UserReviewRepository(AppDBContext db) : base(db) { }
        
        public async Task<List<UserReviews>> GetByUserIdAsync(Guid userId)
        {
            return await _table
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        
    }

}
