// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Talenex.infrastructure.Data;

// public static class ServiceRegistration
// {
//     public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
//     {
//         // EF Core
//         services.AddDbContext<AppDBContext>(options =>
//             options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

//         //// Repositories & services
//         //services.AddScoped<IUserRepository, UserRepository>();
//         //services.AddScoped<IAuthService, AuthService>();
//         //services.AddScoped<IEmailService, EmailService>();

//         return services;
//     }
// }


using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Talenex.infrastructure.Data;
using Talenex.infrastructure.Repositories;
using Talenex.infrastructure.Services;
using Talenex.Application.IRepository;

public static class ServiceRegistration
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration config)
    {
        // EF Core
        services.AddDbContext<AppDBContext>(options =>
            options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

        // Repositories & services
        
        //services.AddScoped<IUserRepository, UserRepository>();
        //services.AddScoped<IAuthService, AuthService>();
        //services.AddScoped<IEmailService, EmailService>();

        return services;
    }
}
