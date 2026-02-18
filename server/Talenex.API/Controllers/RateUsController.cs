using Application.DTOs;
using Application.IRepository;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.DTOs.ResponseDtos;
using Talenex.Application.DTOs.UpdateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Microsoft.AspNetCore.SignalR;
using Talenex.API.Hubs;
using Talenex.infrastructure.Data;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/rate-us")]
public class RateUsController : ControllerBase
{

    private readonly IEmailService _emailService;
  

    public RateUsController(IEmailService emailService)
    {
      
        _emailService = emailService;
     
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendFeedbackRequest([FromBody] FeedbackResponseDto feedbackDto)
    {
        await _emailService.SendFeedBackEmailAsync(feedbackDto);
        return Ok("Rating email sent successfully.");
    }
} 