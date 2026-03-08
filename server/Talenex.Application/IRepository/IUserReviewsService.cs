using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Domain.Entities;

namespace Talenex.Application.IRepository
{
    public interface IUserReviewsService
    {
        Task<List<UserReviews>> GetByUserIdAsync(Guid userId);
        Task<List<UserReviews>> GetByReviewerIdAsync(Guid reviewerId);
        Task AddReviewAsync(CreateUserReviewDto dto);
    }

}
