using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.Common.Enums;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByClerkIdAsync(string clerkUserId);

        Task<List<User>> GetAllUserAsync(List<UserInclude> include);

        Task<User?> GetUserAsync(Guid userId,List<UserInclude> include);


        Task<User?> RegisterOrLoginUser(String clerkUserId, string email, string firstName, string lastName, string imageUrl, DateTime createdAt, DateTime? lastLoginAt);
    }
}