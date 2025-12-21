using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDBContext>
    {
        public AppDBContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDBContext>();

            optionsBuilder.UseSqlServer("Server=SUMITVADHAVA\\SQLEXPRESS;Database=TalenexDB;Trusted_Connection=True;TrustServerCertificate=True");

            return new AppDBContext(optionsBuilder.Options);
        }
    }
}
