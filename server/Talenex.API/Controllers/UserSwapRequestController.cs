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
[Authorize(AuthenticationSchemes = "TalenexJwt")]
[Route("api/swap-request")]
public class UserSwapRequestController : ControllerBase
{
    private readonly IService<UserSwapRequest> _service;
    private readonly IUserSwapRequestService _swapService;
    private readonly IValidator<CreateSwapRequestDto> _createValidator;
    private readonly IValidator<UpdateSwapRequestDto> _updateValidator;

    private readonly IEmailService _emailService;
    private readonly IHubContext<SwapHub> _hubContext;
    private readonly AppDBContext _db;

    public UserSwapRequestController(

        IService<UserSwapRequest> service,
        IUserSwapRequestService swapService,
        IValidator<CreateSwapRequestDto> createValidator,
        IValidator<UpdateSwapRequestDto> updateValidator,
        IEmailService emailService,
        IHubContext<SwapHub> hubContext,
        AppDBContext db
    )
    {
        _service = service;
        _swapService = swapService;
        _createValidator = createValidator;
        _updateValidator = updateValidator;

        _emailService = emailService;
        _hubContext = hubContext;
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetMySwapRequests()
    {
        // UserId from JWT
        var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(ClaimTypes.NameIdentifier);

        Console.WriteLine($"JWT UserId: {userIdClaim}");

        if (userIdClaim == null)
            return Unauthorized();

        var userId = Guid.Parse(userIdClaim.Value);

        var data = await _swapService.GetMySwapRequestsAsync(userId);


        var response = data.Select(x => new SwapRequestResponseDto
        {
            Id = x.Id,

            Role = x.Requester.UserId == userId ? "Requester" : "Receiver",

            Requester = new SwapUserDto
            {
                Id = x.Requester.Id,
                FullName = x.Requester.FullName,
                ProfilePhotoUrl = x.Requester.ProfilePhotoUrl ?? string.Empty
            },

            Receiver = new SwapUserDto
            {
                Id = x.Receiver.Id,
                FullName = x.Receiver.FullName,
                ProfilePhotoUrl = x.Receiver.ProfilePhotoUrl ?? string.Empty
            },

            SkillToOffer = x.SkillToOffer,
            SkillToLearn = x.SkillToLearn,
            ProposedTime = x.ProposedTime,
            DurationMinutes = x.DurationMinutes,
            Status = x.Status,
            CreatedAt = x.CreatedAt,
            AcceptedAt = x.AcceptedAt,
            CancelledAt = x.CancelledAt,
            CompleteAt = x.CompletedAt

        }).ToList();

        return Ok(response);
    }


    [HttpPost]
    public async Task<IActionResult> CreateSwapRequest(CreateSwapRequestDto dto)
    {
        var validationResult = await _createValidator.ValidateAsync(dto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var swapRequest = new UserSwapRequest
        {
            RequesterId = dto.RequesterId,
            ReceiverId = dto.ReceiverId,
            SkillToOffer = dto.SkillToOffer,
            SkillToLearn = dto.SkillToLearn,
            ProposedTime = dto.ProposedTime,
            DurationMinutes = dto.DurationMinutes,
            Message = dto.Message,
            Status = "Pending",
            CreatedAt = DateTime.UtcNow,

        };

        var created = await _service.CreateAsync(swapRequest);

        // Notify Receiver via SignalR
        var receiverProfile = await _db.UserProfiles.Include(u => u.User).FirstOrDefaultAsync(u => u.Id == dto.ReceiverId);
        if (receiverProfile != null)
        {
            await _hubContext.Clients.Group(receiverProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

            // // SAFE EMAIL SENDING
            // try
            // {
            //     var requesterProfile = await _db.UserProfiles.Include(u => u.User).FirstOrDefaultAsync(u => u.Id == dto.RequesterId);
            //     if (requesterProfile != null)
            //     {
            //         var emailDto = new SwapRequestEmailDto
            //         {
            //             PartnerEmail = receiverProfile.User.Email,
            //             PartnerImageUrl = receiverProfile.ProfilePhotoUrl,
            //             YourName = requesterProfile.FullName,
            //             YourImageUrl = requesterProfile.ProfilePhotoUrl,
            //             YourSkill = dto.SkillToOffer,
            //             PartnerSkill = dto.SkillToLearn,
            //             ScheduleDateTime = dto.ProposedTime,
            //             DurationMinutes = dto.DurationMinutes,
            //             PersonalMessage = dto.Message,
            //             Format = "Video Call"
            //         };

            //         await _emailService.SendSwapRequestEmailAsync(emailDto);
            //     }
            // }
            // catch (Exception ex)
            // {
            //     Console.WriteLine($"[SwapRequestController] Email failed but request succeeded: {ex.Message}");
            // }
        }

        return Ok(created);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSwapRequest(Guid id)
    {
        var swapRequest = await _service.GetByIdAsync(id);

        if (swapRequest == null)
        {
            return NotFound();
        }

        return Ok(swapRequest);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSwapRequest(Guid id, [FromBody] UpdateSwapRequestDto dto)
    {

        var validationResult = await _updateValidator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var swapRequest = await _service.GetByIdAsync(id);

        if (swapRequest == null)
        {
            return NotFound();
        }

        // Map properties from dto to entity
        swapRequest.Status = dto.Status;

        switch (dto.Status)
        {
            case "Accepted":
                swapRequest.AcceptedAt = DateTime.UtcNow;
                break;
            case "Cancelled":
                swapRequest.CancelledAt = DateTime.UtcNow;
                break;
            case "Completed":
                swapRequest.CompletedAt = DateTime.UtcNow;
                break;
        }

        await _service.UpdateAsync(swapRequest);

        // Notify both parties
        var requesterProfile = await _db.UserProfiles.FindAsync(swapRequest.RequesterId);
        var receiverProfile = await _db.UserProfiles.FindAsync(swapRequest.ReceiverId);

        if (requesterProfile != null)
            await _hubContext.Clients.Group(requesterProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

        if (receiverProfile != null)
            await _hubContext.Clients.Group(receiverProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

        return Ok(new { message = "Swap request updated successfully." });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSwapRequest(Guid id)
    {
        var swapRequest = await _service.GetByIdAsync(id);

        if (swapRequest == null)
        {
            return NotFound();
        }

        await _service.DeleteAsync(id);
        return NoContent();
    }


    [HttpPost("send")]
    public async Task<IActionResult> SendSwapRequest([FromBody] SwapRequestEmailDto dto)
    {
        await _emailService.SendSwapRequestEmailAsync(dto);
        return Ok("Swap request email sent successfully.");
    }
} 







//=============
//===============


//using Application.DTOs;
//using Application.IRepository;
//using FluentValidation;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http.HttpResults;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.Security.Claims;
//using Talenex.Application.DTOs.CreateDtos;
//using Talenex.Application.DTOs.ResponseDtos;
//using Talenex.Application.DTOs.UpdateDtos;
//using Talenex.Application.IRepository;
//using Talenex.Domain.Entities;
//using Microsoft.AspNetCore.SignalR;
//using Talenex.API.Hubs;
//using Talenex.infrastructure.Data;
//using Microsoft.EntityFrameworkCore;


//[ApiController]
//[Authorize(AuthenticationSchemes = "TalenexJwt")]
//[Route("api/swap-request")]
//public class UserSwapRequestController : ControllerBase
//{
//    private readonly IService<UserSwapRequest> _service;
//    private readonly IUserSwapRequestService _swapService;
//    private readonly IValidator<CreateSwapRequestDto> _createValidator;
//    private readonly IValidator<UpdateSwapRequestDto> _updateValidator;
//    private readonly IEmailService _emailService;
//    private readonly IHubContext<SwapHub> _hubContext;
//    private readonly AppDBContext _db;

//    public UserSwapRequestController(

//        IService<UserSwapRequest> service,
//        IUserSwapRequestService swapService,
//        IValidator<CreateSwapRequestDto> createValidator,
//        IValidator<UpdateSwapRequestDto> updateValidator,
//        IEmailService emailService,
//        IHubContext<SwapHub> hubContext,
//        AppDBContext db
//    )
//    {
//        _service = service;
//        _swapService = swapService;
//        _createValidator = createValidator;
//        _updateValidator = updateValidator;
//        _emailService = emailService;
//        _hubContext = hubContext;
//        _db = db;
//    }

//    [HttpGet]
//    public async Task<IActionResult> GetMySwapRequests()
//    {
//        // UserId from JWT
//        var userIdClaim = User.FindFirst("sub") ?? User.FindFirst(ClaimTypes.NameIdentifier);

//        Console.WriteLine($"JWT UserId: {userIdClaim}");

//        if (userIdClaim == null)
//            return Unauthorized();

//        var userId = Guid.Parse(userIdClaim.Value);

//        var data = await _swapService.GetMySwapRequestsAsync(userId);


//        var response = data.Select(x => new SwapRequestResponseDto
//        {
//            Id = x.Id,

//            Role = x.Requester.UserId == userId ? "Requester" : "Receiver",

//            Requester = new SwapUserDto
//            {
//                Id = x.Requester.Id,
//                FullName = x.Requester.FullName,
//                ProfilePhotoUrl = x.Requester.ProfilePhotoUrl ?? string.Empty
//            },

//            Receiver = new SwapUserDto
//            {
//                Id = x.Receiver.Id,
//                FullName = x.Receiver.FullName,
//                ProfilePhotoUrl = x.Receiver.ProfilePhotoUrl ?? string.Empty
//            },

//            SkillToOffer = x.SkillToOffer,
//            SkillToLearn = x.SkillToLearn,
//            ProposedTime = x.ProposedTime,
//            DurationMinutes = x.DurationMinutes,
//            Status = x.Status,
//            CreatedAt = x.CreatedAt,
//            AcceptedAt = x.AcceptedAt,
//            CancelledAt = x.CancelledAt,
//            CompleteAt = x.CompletedAt

//        }).ToList();


//        return Ok(response);
//    }


//    [HttpPost]
//    public async Task<IActionResult> CreateSwapRequest(CreateSwapRequestDto dto)
//    {
//        var validationResult = await _createValidator.ValidateAsync(dto);
//        if (!validationResult.IsValid)
//        {
//            return BadRequest(validationResult.Errors);
//        }

//        var swapRequest = new UserSwapRequest
//        {
//            RequesterId = dto.RequesterId,
//            ReceiverId = dto.ReceiverId,
//            SkillToOffer = dto.SkillToOffer,
//            SkillToLearn = dto.SkillToLearn,
//            ProposedTime = dto.ProposedTime,
//            DurationMinutes = dto.DurationMinutes,
//            Message = dto.Message,
//            Status = "Pending",
//            CreatedAt = DateTime.UtcNow,

//        };

//        var created = await _service.CreateAsync(swapRequest);

//        // Notify Receiver via SignalR
//        var receiverProfile = await _db.UserProfiles.Include(u => u.User).FirstOrDefaultAsync(u => u.Id == dto.ReceiverId);
//        if (receiverProfile != null)
//        {
//            await _hubContext.Clients.Group(receiverProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

//            // SAFE EMAIL SENDING: 
//            // We fetch the requester's info and try to send an email.
//            // If it fails, we log it but STILL return Ok(created) so the app doesn't crash.
//            try
//            {
//                var requesterProfile = await _db.UserProfiles.Include(u => u.User).FirstOrDefaultAsync(u => u.Id == dto.RequesterId);
//                if (requesterProfile != null)
//                {
//                    var emailDto = new SwapRequestEmailDto
//                    {
//                        PartnerEmail = receiverProfile.User.Email,
//                        PartnerImageUrl = receiverProfile.ProfilePhotoUrl,
//                        YourName = requesterProfile.FullName,
//                        YourImageUrl = requesterProfile.ProfilePhotoUrl,
//                        YourSkill = dto.SkillToOffer,
//                        PartnerSkill = dto.SkillToLearn,
//                        ScheduleDateTime = dto.ProposedTime,
//                        DurationMinutes = dto.DurationMinutes,
//                        PersonalMessage = dto.Message,
//                        Format = "Video Call"
//                    };

//                    // Fire and forget or await but catch? 
//                    // Awaiting with catch is better for reliability since we aren't using a queue yet.
//                    await _emailService.SendSwapRequestEmailAsync(emailDto);
//                }
//            }
//            catch (Exception ex)
//            {
//                // LOG THE ERROR: Do not crash the whole request if the email fails.
//                Console.WriteLine($"[SwapRequestController] Email failed but request succeeded: {ex.Message}");
//            }
//        }

//        return Ok(created);
//    }

//    [HttpGet("{id}")]
//    public async Task<IActionResult> GetSwapRequest(Guid id)
//    {
//        var swapRequest = await _service.GetByIdAsync(id);

//        if (swapRequest == null)
//        {
//            return NotFound();
//        }

//        return Ok(swapRequest);
//    }

//    [HttpPut("{id}")]
//    public async Task<IActionResult> UpdateSwapRequest(Guid id, [FromBody] UpdateSwapRequestDto dto)
//    {

//        var validationResult = await _updateValidator.ValidateAsync(dto);

//        if (!validationResult.IsValid)
//        {
//            return BadRequest(validationResult.Errors);
//        }

//        var swapRequest = await _service.GetByIdAsync(id);

//        if (swapRequest == null)
//        {
//            return NotFound();
//        }

//        // Map properties from dto to entity
//        swapRequest.Status = dto.Status;

//        switch (dto.Status)
//        {
//            case "Accepted":
//                swapRequest.AcceptedAt = DateTime.UtcNow;
//                break;
//            case "Cancelled":
//                swapRequest.CancelledAt = DateTime.UtcNow;
//                break;
//            case "Completed":
//                swapRequest.CompletedAt = DateTime.UtcNow;
//                break;
//        }

//        await _service.UpdateAsync(swapRequest);

//        // Notify both parties
//        var requesterProfile = await _db.UserProfiles.FindAsync(swapRequest.RequesterId);
//        var receiverProfile = await _db.UserProfiles.FindAsync(swapRequest.ReceiverId);

//        if (requesterProfile != null)
//            await _hubContext.Clients.Group(requesterProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

//        if (receiverProfile != null)
//            await _hubContext.Clients.Group(receiverProfile.UserId.ToString()).SendAsync("ReceiveSwapUpdate");

//        return Ok(new { message = "Swap request updated successfully." });
//    }

//    [HttpDelete("{id}")]
//    public async Task<IActionResult> DeleteSwapRequest(Guid id)
//    {
//        var swapRequest = await _service.GetByIdAsync(id);

//        if (swapRequest == null)
//        {
//            return NotFound();
//        }

//        await _service.DeleteAsync(id);
//        return NoContent();
//    }


//    [HttpPost("send")]
//    public async Task<IActionResult> SendSwapRequest([FromBody] SwapRequestEmailDto dto)
//    {
//        await _emailService.SendSwapRequestEmailAsync(dto);
//        return Ok("Swap request email sent successfully.");
//    }
//}