using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserService : IService<User>
    {
        Task<User?> GetByClerkIdAsync(string clerkUserId);
        Task<User?> RegisterOrLoginUser(
            string clerkUserId,
            string email,
            string firstName,
            string lastName,
            string imageUrl,
            DateTime createdAt,
            DateTime? lastLoginAt
        );


    }
}
