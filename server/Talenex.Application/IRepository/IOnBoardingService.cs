using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;

namespace Talenex.Application.IRepository
{
    public interface IOnboardingService
    {
        Task CompleteOnboardingAsync(Guid userId, OnBoardingDto dto);
    }

}