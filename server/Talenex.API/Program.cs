//using Microsoft.EntityFrameworkCore;
//using Talenex.Application.IRepository;
//using Talenex.infrastructure.Services;
//using Talenex.infrastructure.Data;
//using Talenex.infrastructure.Repositories;
//using FluentValidation;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();

////clerk 
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//.AddJwtBearer(options =>
//{
//    options.Authority = builder.Configuration["Clerk:Authority"];
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = false,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        NameClaimType = "sub"
//    };
//});

//builder.Services.AddAuthorization();
//builder.Services.AddHttpClient();


//builder.Services.AddDbContext<AppDBContext>(options =>
//    options.UseSqlServer(
//        builder.Configuration.GetConnectionString("DefaultConnection")
//    )
//);

//builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
//builder.Services.AddScoped(typeof(IService<>), typeof(GenericService<>));

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins",
//        builder => builder.AllowAnyOrigin()
//                          .AllowAnyMethod()
//                          .AllowAnyHeader());
//});



//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}


//app.UseHttpsRedirection();
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();

//app.Run();

// -------------------- Second Attempt -------------------- //

// using FluentValidation;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using Talenex.Application.IRepository;
// using Talenex.infrastructure.Data;
// using Talenex.infrastructure.Repositories;
// using Talenex.infrastructure.Services;
// using Talenex.Application.Validators;
// using Talenex.Application.DTOs;
// // using Talenex.infrastructure.Services;
// using Talenex.Infrastructure.Services;
// using System.Text;

// var builder = WebApplication.CreateBuilder(args);

// // ==========================
// // Controllers
// // ==========================
// builder.Services.AddControllers();

// // ==========================
// // Clerk JWT Authentication
// // ==========================
// builder.Services
//     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.Authority = builder.Configuration["Clerk:Authority"];

//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = false,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,

//             // Clerk uses "sub" as user id
//             NameClaimType = "sub"
//         };
//     });

// builder.Services.AddAuthorization();
// builder.Services.AddHttpClient();

// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserProfileValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserProfileValidator>();

// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserAvailabilityValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserAvailabilityValidator>();

// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserPrivacyValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserPrivacyValidator>();


// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserReputationValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserReputationValidator>();


// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserValidator>();


// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserSkillsValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserSkillsValidator>();


// builder.Services.AddValidatorsFromAssemblyContaining<CreateUserNotificationPreferencesValidator>();
// builder.Services.AddValidatorsFromAssemblyContaining<UpdateUserNotificationPreferencesValidator>();



// // ==========================
// // Database
// // ==========================
// builder.Services.AddDbContext<AppDBContext>(options =>
//     options.UseSqlServer(
//         builder.Configuration.GetConnectionString("DefaultConnection")
//     )
// );

// // ==========================
// // Dependency Injection
// // ==========================
// builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
// builder.Services.AddScoped(typeof(IService<>), typeof(GenericService<>));
// builder.Services.AddScoped(typeof(IUserService), typeof(UserService));
// builder.Services.AddScoped<IClerkService, ClerkService>();
// builder.Services.AddScoped<IUserRepository, UserRepository>();
// builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();


// // ==========================
// // CORS (Frontend → Backend)
// // ==========================
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("FrontendPolicy", policy =>
//     {
//         policy
//             .WithOrigins(
//                 "http://localhost:5173", // Vite
//                 "http://localhost:3000"  // CRA (optional)
//             )
//             .AllowAnyMethod()
//             .AllowAnyHeader()
//             .AllowCredentials();
//     });
// });

// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = builder.Configuration["Jwt:Issuer"],
//             ValidAudience = builder.Configuration["Jwt:Audience"],
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])
//             )
//         };
//     });


// // ==========================
// // Swagger
// // ==========================
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// var app = builder.Build();

// // ==========================
// // HTTP Pipeline
// // ==========================
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();

// app.UseRouting();

// // ⚠️ CORS MUST be before auth
// app.UseCors("FrontendPolicy");

// app.UseAuthentication();
// app.UseAuthorization();

// app.MapControllers();

// app.Run();


using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Talenex.Application.DTOs;
using Talenex.Application.IRepository;
using Talenex.Application.Validators;
using Talenex.infrastructure.Data;
using Talenex.infrastructure.Repositories;
using Talenex.infrastructure.Services;
using Talenex.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================
// Controllers
// ==========================
builder.Services.AddControllers();

// ==========================
// Authentication (ONCE)
// ==========================
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

// ==========================
// Clerk JWT (External Provider)
// ==========================
builder.Services.AddAuthentication()
    .AddJwtBearer("Clerk", options =>
    {
        options.Authority = builder.Configuration["Clerk:Authority"];

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = false,
            ValidateLifetime = true,

            // Clerk uses "sub" as user id
            NameClaimType = "sub"
        };
    });

// ==========================
// Your App JWT (Internal)
// ==========================
builder.Services.AddAuthentication()
    .AddJwtBearer("TalenexJwt", options =>
    {
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
    });

// ==========================
// Authorization
// ==========================
builder.Services.AddAuthorization();

// ==========================
// HttpClient (ClerkService needs this)
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

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddScoped<IClerkService, ClerkService>();

// ==========================
// CORS
// ==========================
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

// ==========================
// Swagger
// ==========================
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ==========================
// HTTP Pipeline
// ==========================
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

// CORS must be before auth
app.UseCors("FrontendPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
