using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;

namespace Talenex.infrastructure.Repositories
{
    public interface IUserReputationRepository  : IRepository<UserReputation>
    {

        public Task<UserReputation?> GetByUserIdAsync(Guid userId);

        public Task UpdateByUserIdAsync(Guid userId, int totalReviews, decimal avgRating, int trustScore);

    }
}