using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;
using Talenex.Domain.Entities;

namespace Talenex.Application.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<User> User { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<UserSkills> UserSkills { get; set; }
        public DbSet<UserAvailability> UserAvailability { get; set; }

        public DbSet<UserPrivacy> UserPrivacies { get; set; }

        public DbSet<UserNotificationPreferences> UserNotificationPreferences { get; set; }

        public DbSet<UserReputation> UserReputations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(u =>
            {
                u.ToTable("Users");
                u.HasKey(u => u.Id);
                u.Property(u => u.Email).HasMaxLength(100).IsRequired();
                u.HasIndex(u => u.Email).IsUnique();
                u.Property(u => u.PasswordHash).IsRequired();
            });

            modelBuilder.Entity<UserProfile>(u =>
            {
                u.ToTable("UserProfiles");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
                u.Property(u => u.FullName).HasMaxLength(100).IsRequired();
                u.Property(u => u.Username).HasMaxLength(100).IsRequired();
            });

            modelBuilder.Entity<UserSkills>(u =>
            {
                u.ToTable("UserSkills");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
            });

            modelBuilder.Entity<UserPrivacy>(u =>
            {
                u.ToTable("UserPrivacy");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
            });

            modelBuilder.Entity<UserAvailability>(u =>
            {
                u.ToTable("UserAvailabilities");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
            });

            modelBuilder.Entity<UserNotificationPreferences>(u =>
            {
                u.ToTable("UserNotificationPreferences");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
            });

            modelBuilder.Entity<UserReputation>(u =>
            {
                u.ToTable("UserReputation");
                u.HasKey(u => u.Id);
                u.Property(u => u.UserId).IsRequired();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
