using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;

namespace Talenex.infrastructure.Services
{
    public class UserService : GenericService<User>
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository repository) : base(repository)
        {
            _userRepository = repository;
            
        }

        public async Task<User?> GetByClerkId(string clerkUserId)
        {
            return await _userRepository.GetByClerkIdAsync(clerkUserId); 
        }

        public async Task<User?> RegisterOrLoginUser(
            string clerkUserId,
            string email,
            string firstName,
            string lastName,
            string imageUrl,
            DateTime createdAt,
            DateTime? lastLoginAt
        )
        {
            return await _userRepository.RegisterOrLoginUser(
                clerkUserId,
                email,
                firstName,
                lastName,
                imageUrl,
                createdAt,
                lastLoginAt
            );
        }

    }
}