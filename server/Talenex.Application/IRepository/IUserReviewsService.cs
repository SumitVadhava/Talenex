using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.IRepository
{
    public interface IUserReviewsService
    {
        Task AddReviewAsync(CreateUserReviewDto dto);
    }

}
