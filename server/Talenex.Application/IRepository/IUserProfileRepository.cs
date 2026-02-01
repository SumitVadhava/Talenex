using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;
using Talenex.Application.IRepository;


namespace Talenex.Application.IRepository
{
    public interface IUserProfileRepository : IRepository<UserProfile>
    {
        Task<UserProfile?> GetByUserIdAsync(Guid userId);
    }

}