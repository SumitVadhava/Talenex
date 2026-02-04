// 3rd attempt

using Application.IRepository;
using FluentValidation;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Talenex.API.Hubs;
using Talenex.Application.IRepository;
using Talenex.Application.Validators;
using Talenex.infrastructure.Data;
using Talenex.infrastructure.Repositories;
using Talenex.infrastructure.Services;
using Talenex.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://0.0.0.0:10000");
// ==========================
// Controllers
// ==========================
builder.Services.AddControllers();

builder.WebHost.UseUrls("http://0.0.0.0:10000");

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddSignalR();

// ==========================
// Authentication (JWT + Clerk)
// ==========================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
// Internal App JWT (Default)
.AddJwtBearer("TalenexJwt", options =>
{
    options.MapInboundClaims = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)
        )
    };

    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            var accessToken = context.Request.Query["access_token"];
            var path = context.HttpContext.Request.Path;
            if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/swaphub"))
            {
                context.Token = accessToken;
            }
            return Task.CompletedTask;
        }
    };
})
// Clerk JWT (External Provider)
.AddJwtBearer("Clerk", options =>
{
    options.Authority = builder.Configuration["Clerk:Authority"];
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        NameClaimType = "sub"
    };
});

// ==========================
// Authorization
// ==========================
builder.Services.AddAuthorization();

// ==========================
// HttpClient
// ==========================
builder.Services.AddHttpClient();

// ==========================
// FluentValidation
// ==========================
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserProfileValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserProfileValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserAvailabilityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserAvailabilityValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserPrivacyValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserPrivacyValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserReputationValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserReputationValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserSkillsValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserSkillsValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserNotificationPreferencesValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserNotificationPreferencesValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<CreateSwapRequestValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UpdateSwapRequestValidator>();



// ==========================
// Database
// ==========================
builder.Services.AddDbContext<AppDBContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

// ==========================
// Dependency Injection
// ==========================
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped(typeof(IService<>), typeof(GenericService<>));

builder.Services.AddScoped<IOnboardingService, OnboardingService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<IUserSwapRequestRepository, UserSwapRequestRepository>();
builder.Services.AddScoped<IUserReviewRepository, UserReviewRepository>();
builder.Services.AddScoped<IUserSwapRequestService, UserSwapRequestService>();
builder.Services.AddScoped<IUserReviewsService,UserReviewService>();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IClerkService, ClerkService>();
builder.Services.AddScoped<IZegoTokenService, ZegoTokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();



// ==========================
// CORS
// ==========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("https://talenex.vercel.app", "http://localhost:5173", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials(); // Required for SignalR
    });
});

// ==========================
// Swagger (JWT 🔒 Enabled)
// ==========================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Talenex API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter token as: Bearer {your JWT token}"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

// ==========================
// HTTP Pipeline
// ==========================
// Enable Swagger for ALL environments to make it easier to test on Render
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Talenex API V1");
    c.RoutePrefix = "swagger"; // Swagger UI will be at /swagger
});

app.UseHttpsRedirection();

app.UseRouting();

// CORS BEFORE auth
app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => Results.Ok(new { Message = "Talenex API is Running", Status = "Healthy", Version = "1.0" }));

app.MapControllers();
app.MapHub<SwapHub>("/swaphub");

app.Run();