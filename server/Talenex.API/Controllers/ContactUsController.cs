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
[Route("api/contact-us")]
public class ContactUsController : ControllerBase
{

    private readonly IEmailService _emailService;
  

    public ContactUsController(IEmailService emailService)
    {
      
        _emailService = emailService;
     
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendSwapRequest([FromBody] ContactEmailDto emaildto)
    {
        await _emailService.SendContactEmailAsync(emaildto);
        return Ok("Contact email sent successfully.");
    }
} 