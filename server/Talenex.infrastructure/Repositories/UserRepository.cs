using Microsoft.EntityFrameworkCore;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDBContext db) : base(db)
        {
        }

        public async Task<User?> GetByClerkIdAsync(string clerkUserId)
        {
            return await _table.FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);
        }

        public async Task<User?> RegisterOrLoginUser(
            string clerkUserId,
            string email,
            string firstName,
            string lastName,
            string imageUrl,
            DateTime createdAt,
            DateTime? lastLoginAt)
        {
            var user = await GetByClerkIdAsync(clerkUserId);

            if (user == null)
            {
                user = new User
                {
                    ClerkUserId = clerkUserId,
                    Email = email,
                    FirstName = firstName,
                    LastName = lastName,
                    ImageUrl = imageUrl,
                    CreatedAt = createdAt,
                    LastLoginAt = lastLoginAt
                };

                await AddAsync(user);        // ✅ base method
            }
            else
            {
                user.LastLoginAt = lastLoginAt;
                await UpdateAsync(user);     // ✅ base method
            }

            return user;
        }
    }
}