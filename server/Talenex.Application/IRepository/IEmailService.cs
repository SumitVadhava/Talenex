using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.ResponseDtos;

namespace Application.IRepository
{
    public interface IEmailService
    {
        Task SendSwapRequestEmailAsync(SwapRequestEmailDto dto);
        Task SendContactEmailAsync(ContactEmailDto dto);

        Task SendFeedBackEmailAsync(FeedbackResponseDto dto);

    }
}

