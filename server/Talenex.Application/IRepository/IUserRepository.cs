using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User?> GetByClerkIdAsync(string clerkUserId);
        Task<User?> RegisterOrLoginUser(String clerkUserId, string email, string firstName, string lastName, string imageUrl, DateTime createdAt, DateTime? lastLoginAt);
    }
}