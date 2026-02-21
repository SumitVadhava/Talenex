using Microsoft.EntityFrameworkCore;
using Talenex.Application.Common.Enums;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(AppDBContext db) : base(db)
        {}

        public async Task<User?> GetByClerkIdAsync(string clerkUserId)
        {
            return await _table.FirstOrDefaultAsync(u => u.ClerkUserId == clerkUserId);
        }

        public async Task<List<User>> GetAllUserAsync(List<UserInclude> include)
        {
            IQueryable<User> query = _table.AsQueryable();

            foreach (var inc in include)
            {
                switch (inc)
                {
                    case UserInclude.Profile:
                        query = query.Include(u => u.UserProfile);
                        break;

                    case UserInclude.Skills:
                        query = query.Include(u => u.UserSkills);
                        break;

                    case UserInclude.Availability:
                        query = query.Include(u => u.UserAvailability);
                        break;

                    case UserInclude.Privacy:
                        query = query.Include(u => u.UserPrivacy);
                        break;

                    case UserInclude.Reputation:
                        query = query.Include(u => u.UserReputation);
                        break;

                    case UserInclude.Notifications:
                        query = query.Include(u => u.UserNotifications);
                        break;

                    case UserInclude.Reviews:
                        query = query.Include(u => u.UserReviews);
                        break;

                    case UserInclude.Favourites:
                        query = query.Include(u => u.UserFavourites);
                        break;

                }
            }

            return await query.ToListAsync();
        }



        public async Task<User?> GetUserAsync(Guid userId, List<UserInclude> include)
        {
            IQueryable<User> query = _table.AsQueryable();

            foreach (var inc in include)
            {
                switch (inc)
                {
                    case UserInclude.Profile:
                        query = query.Include(u => u.UserProfile);
                        break;

                    case UserInclude.Skills:
                        query = query.Include(u => u.UserSkills);
                        break;

                    case UserInclude.Availability:
                        query = query.Include(u => u.UserAvailability);
                        break;

                    case UserInclude.Privacy:
                        query = query.Include(u => u.UserPrivacy);
                        break;

                    case UserInclude.Reputation:
                        query = query.Include(u => u.UserReputation);
                        break;

                    case UserInclude.Notifications:
                        query = query.Include(u => u.UserNotifications);
                        break;

                    case UserInclude.Reviews:
                        query = query.Include(u => u.UserReviews);
                        break;

                    case UserInclude.Favourites:
                        query = query.Include(u => u.UserFavourites);
                        break;
                }
            }

            return await query.FirstOrDefaultAsync(u => u.Id == userId);
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
            var user = await _table.FirstOrDefaultAsync(u =>
                u.ClerkUserId == clerkUserId || u.Email == email
            );


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

                await AddAsync(user);     
            }
            else
            {
                user.LastLoginAt = lastLoginAt;
                await UpdateAsync(user); 
            }

            return user;
        }
    }
}