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
[Authorize(AuthenticationSchemes = "TalenexJwt")]
public class RateUsController : ControllerBase
{

    private readonly IEmailService _emailService;
    private readonly IService<RateUs> _service;

    public RateUsController(IEmailService emailService, IService<RateUs> service)
    {
      
        _emailService = emailService;
        _service = service;
    
    }

    [AllowAnonymous]
    [HttpGet]
    public async Task<IActionResult> GetAll()
          => Ok(await _service.GetAllAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var user = await _service.GetByIdAsync(id);
        return user == null ? NotFound() : Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateFeedbackDto dto)
    {

        var entity = new RateUs
        {
            UserId = dto.UserId,
            UserName = dto.UserName,
            UserEmail = dto.UserEmail,
            UserProfileImg = dto.UserProfileImg,
            OverallExperience = dto.OverallExperience,
            UiUxDesign = dto.UiUxDesign,
            ApplicationSpeed = dto.ApplicationSpeed,
            SkillsMatchingAccuracy = dto.SkillsMatchingAccuracy,
            SearchAndFiltersEffectiveness = dto.SearchAndFiltersEffectiveness,
            CommunityTrust = dto.CommunityTrust,
            EaseOfNavigation = dto.EaseOfNavigation,
            FeatureUsefulness = dto.FeatureUsefulness,
            HelpAndSupportQuality = dto.HelpAndSupportQuality,
            Message =   dto.Message
        };


        var created = await _service.CreateAsync(entity);
        return Ok(created);
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendFeedbackRequest([FromBody] FeedbackResponseDto feedbackDto)
    {
        await _emailService.SendFeedBackEmailAsync(feedbackDto);
        return Ok("Rating email sent successfully.");
    }
} 