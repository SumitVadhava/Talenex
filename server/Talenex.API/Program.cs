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

//builder.WebHost.UseUrls("http://0.0.0.0:10000");
// ==========================
// Controllers
// ==========================
builder.Services.AddControllers();

// builder.WebHost.UseUrls("http://0.0.0.0:10000");

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

// builder.Services.AddScoped<IPaymentService, RazorpayService>();



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
// IPaymentService is registered in AddInfrastructure, but we can also ensure it here if needed
// builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddScoped<IOnboardingService, OnboardingService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<IUserSwapRequestRepository, UserSwapRequestRepository>();
builder.Services.AddScoped<IUserReviewRepository, UserReviewRepository>();
builder.Services.AddScoped<IUserReputationRepository, UserReputationRepository>();
builder.Services.AddScoped<IUserSwapRequestService, UserSwapRequestService>();
builder.Services.AddScoped<IUserReviewsService,UserReviewService>();

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IClerkService, ClerkService>();
builder.Services.AddScoped<IZegoTokenService, ZegoTokenService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IChatService, ChatService>();

builder.Services.AddScoped<IPaymentService, PaymentService>();



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
        Title = "Talenex - Skill Swap Platform REST API",
        Version = "1.0.0",
        Description = @"
<div style='text-align: center; margin-bottom: 2rem;'>
  <h1 style='color: #4f46e5; font-size: 2.5rem; margin-bottom: 0.5rem;'>🌟 Welcome to Talenex REST API</h1>
  <p style='font-size: 1.2rem; color: #6b7280;'>Empowering Next-Generation Talent & Skill Exchange</p>
</div>

---

### 🚀 Platform Overview

**Talenex** is a production-grade, dual-sided professional networking platform that redefines how skills are exchanged. It uniquely combines traditional recruitment workflows with a sophisticated peer-to-peer **Skill Swap Marketplace** — enabling professionals to barter expertise without monetary transactions.

Designed for scale, Talenex utilizes **.NET 8 Clean Architecture** to process real-time WebSocket negotiations, generate on-the-fly WebRTC video tokens, and strictly enforce database-level domain logic.

---

### 🏗️ Architecture Deep Dive

Talenex enforces a **strict four-layer Clean Architecture** with hard dependency inversion — each layer aware only of the layer directly beneath it:

| Layer | Responsibility |
| :--- | :--- |
| **Domain (Core)** | Business entities (`User`, `Skill`, `SwapRequest`, `UserReview`, `UserReputation`), domain events, value objects, business rules. Zero external dependencies. |
| **Application** | CQRS commands & queries (`CreateSwapRequestCommand`, `GetUserProfileQuery`), DTOs, AutoMapper profiles, FluentValidation validators, business logic orchestration. |
| **Infrastructure** | EF Core SQL Server implementations, ZegoCloud / Stream Chat / Razorpay integrations, JWT issuance, file storage adapters. |
| **Presentation (API)** | Thin ASP.NET Core controllers, SignalR Hubs, global exception middleware, Swagger configuration. |

---

### 🛠️ Technical Foundation

- **Backend Framework:** .NET 8 ASP.NET Core Web API
- **Architecture Pattern:** Strict Clean Architecture (Domain, Application, Infrastructure, API)
- **Persistence Layer:** SQL Server managed via Entity Framework Core (Migrations + domain-level constraints)
- **Real-Time WebSockets:** `SignalR` Hubs for live swap negotiation & notification delivery
- **Validation:** `FluentValidation` pipeline-integrated — controllers never see an invalid payload
- **Provider Integrations:** ZegoCloud (Video WebRTC), Stream Chat (Conversations), Razorpay (Financials)
- **Caching / Search (Planned):** Redis for hot data, Elasticsearch for full-text skill discovery

---

### 📦 Standard Data Envelope

Payload predictability is enforced via strict wrapper architectures for seamless client consumption:
```json
{
  ""isSuccess"": true,
  ""message"": ""Swap Request processed successfully"",
  ""data"": { ... }
}
```

This envelope is applied globally via middleware — controllers return clean domain objects and never construct the wrapper themselves.

---

### 🔐 Authentication Flow & Context Boundaries

Talenex employs a secure **Hybrid Identity Model** leveraging Clerk UI and an internal .NET JWT generation service for localized `User` tracking.

1. Click the **Authorize** button (🔓) located at the top-right.
2. Provide your valid Application JWT as: `Bearer <your_token>`.
3. Execution constraints dynamically shift based on your Authorized Role:

| Role | Access Level | Strategic Capabilities |
| :--- | :--- | :--- |
| **Admin** | Platform-Wide Oversight | Centralized analytics, testimonial curation (`RateUsController`), moderation overrides. |
| **Professional** | Marketplace Exchange | Initiation of `SkillSwapRequests`, dynamic reputation accumulation, managing `UserAvailability`. |

*(Endpoints devoid of the lock icon operate publicly without tokenization.)*

> **Why Hybrid Auth?** Clerk eliminates the operational burden of OTP flows, email verification, and OAuth plumbing. The internal JWT service then creates a localized `User` record on first login — keeping all domain data under Talenex's control without rebuilding an auth UI from scratch.

---

### ✨ Unique Core Systems

#### 🔄 SwapHub Orchestration — `UserSwapRequestsController`
The heartbeat of the platform. Manages the **complete lifecycle** of a Skill Swap:
- `Pending` → `Accepted` → `Completed` | Exits: `Rejected`, `Cancelled`, `Disputed`
- Every status transition fires a **SignalR event** — both parties notified instantly, zero polling.
- Swap initiation captures: skills bartered, proposed time, session mode (Online / In-Person / Hybrid), and an optional learning-goals message.

#### 🎥 Live Video Tying — `ZegoController`
Secure endpoints dynamically generating **ZegoCloud WebRTC tokens** for authenticated video sessions:
- Token generation is gated: both users must be authenticated AND a valid `Accepted` swap must exist between them.
- Tokens are **short-lived and room-scoped** (room ID derived from swap identity) — preventing any token harvesting.
- ZegoCloud abstracts STUN/TURN infrastructure and NAT traversal; this controller only issues credentials.

#### ⭐ Reputation Engine — `UserReviewsController` + `UserReputationController`
Post-swap, both parties submit structured **multi-criteria reviews** across 7 dimensions:

#### 👤 Profile Governance
- **`UserPrivacyController`** — Granular controls: toggle profile visibility, skill/location exposure, message access permissions, GDPR-compliant data export, and account deletion.
- **`UserNotificationPreferencesController`** — Per-event channel control (in-app SignalR vs. email) for swap requests, review prompts, messages, and system alerts.
- **`UserAvailabilityController`** — Professionals declare time slots, timezone, max swaps/month, and preferred session duration — powering the matching and scheduling engine.

#### 📢 Platform Trust — `RateUsController`
Admin-scoped controller for curating **platform-level testimonials**. Admins review, approve, and publish user-submitted testimonials surfaced on marketing pages — providing centralized oversight of public-facing social proof.

---

### ⚡ Real-Time Architecture — SignalR

Talenex runs a dedicated **SwapHub** SignalR hub for all live synchronization:

- Swap request received / status changed
- New in-swap message
- Review submitted (prompts counterparty)
- Availability updated (can reorder discovery feeds)

Clients connect post-authentication. The hub places connections into **user-scoped groups** using JWT identity — ensuring notifications are delivered exclusively to relevant parties, never broadcast.

> **Why SignalR over raw WebSockets?** Automatic transport negotiation (WebSockets → SSE → Long Polling), built-in group management, and seamless ASP.NET Core DI integration — reducing real-time infrastructure to hub methods that look like ordinary C# methods.

---

### 🗄️ Database Domain Model

SQL Server schema enforced via EF Core Migrations with domain-level constraints:

| Table | Purpose |
| :--- | :--- |
| `Users` | Identity, profile metadata, authentication state |
| `UserSkills` | Proficiency levels, experience years, certifications per user |
| `UserSwapRequests` | Swap lifecycle — skills bartered, status, session mode, scheduling |
| `UserReviews` | Multi-criteria post-swap reviews (7 dimensions, 1–5 stars each) |
| `UserReputation` | Aggregated reputation scores derived from `UserReviews` |
| `UserAvailability` | Time slots, timezone, session preferences |
| `UserPrivacy` | Per-user visibility and data-control flags |
| `UserNotificationPreferences` | Per-event notification channel choices |
| `UserFavorites` | List of users that the user has favorited |
| `RateUs` | List of testimonials that the user has submitted |
| `Payments` | List of payments that the user has made |

---

### 🚦 Error Handling & Response Codes

Talenex features strict payload validation via pipeline-integrated `FluentValidation` — invalid requests are rejected at the boundary before any controller action executes.

* `200 OK` / `201 Created` — Execution succeeded; DB mutated.
* `400 Bad Request` — Validation failure (Malformed payload / Missing constraints). Returns structured field-level error objects.
* `401 Unauthorized` — Unrecognized or Expired JWT Token.
* `403 Forbidden` — Token valid, but Ownership / Role privileges are insufficient.
* `500 Server Error` — Caught by global exception middleware (Trips Axios exponential client retries on the frontend).

---

### 🔑 Key Engineering Decisions

> **Clean Architecture** — Protects the domain from framework churn. Swapping EF Core for Dapper, or Razorpay for Stripe, requires touching only the Infrastructure layer. Domain and Application layers have zero persistence-technology awareness.

> **FluentValidation in the Pipeline** — Controllers remain single-responsibility. Validators are isolated `AbstractValidator<T>` classes — fully unit-testable, producing structured error responses rather than raw exceptions.

> **Hybrid Identity (Clerk + Internal JWT)** — Clerk handles OTP, OAuth, and email verification. The internal service creates a localized `User` on first login — platform data stays owned by Talenex.

> **ZegoCloud over Raw WebRTC** — Building signaling servers and TURN infrastructure is non-trivial. ZegoCloud manages the media plane; `ZegoController` issues only token credentials.

> **SignalR over Raw WebSockets** — Automatic transport fallback, DI-integrated group management, and zero client-side handshake complexity.
 
---

<br/>
<div style='text-align: center; font-style: normal; color: #9ca3af; line-height: 1.8;'>
    <h3 style='color: #4f46e5; margin-bottom: 0.5rem;'>📞 Contact Us</h3>
    <strong>👥 Support Team:</strong> Talenex Development Team <br/>
    <a href='mailto:talenexcommunity@gmail.com' style='color: #6b7280; text-decoration: none;'>📧 talenexcommunity@gmail.com</a> <br/>
    <a href='https://talenex.vercel.app' style='color: #6b7280; text-decoration: none;' target='_blank'>🌐 https://talenex.vercel.app</a>    
</div>

"
    });

    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);

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
app.UseStaticFiles(); // Required to serve custom CSS and favicon from wwwroot

// Enable Swagger for ALL environments to make it easier to test on Render
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Talenex API V1");
    c.RoutePrefix = "swagger"; 
    c.EnableFilter();    
    c.DocumentTitle = "Talenex API Docs";
    c.HeadContent = "<link rel='icon' type='image/png' href='/swagger-ui/favicon.png'>";
    c.DisplayRequestDuration();
    c.InjectStylesheet("/swagger-ui/custom.css");
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