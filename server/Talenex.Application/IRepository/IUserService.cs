using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.Common.Enums;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserService : IService<User>
    {
        Task<User?> GetByClerkIdAsync(string clerkUserId);

        Task<User?> GetUserAsync(Guid Id, List<UserInclude> includes);
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
