using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDBContext>
    {
        public AppDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();

            optionsBuilder.UseSqlServer("Server=tcp:talenex-server.database.windows.net,1433;Database=TalenexDB;User Id=SumitVadhava;Password=@Sumit806;Encrypt=True;TrustServerCertificate=True;");

            return new AppDBContext(optionsBuilder.Options);
        }
    }
}