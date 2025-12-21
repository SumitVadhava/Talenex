using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;

namespace Talenex.infrastructure.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) {
            
        
        }

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

                // Primary Key
                u.HasKey(x => x.Id);

                // Clerk User ID
                u.Property(x => x.ClerkUserId)
                    .HasMaxLength(100)
                    .IsRequired();

                u.HasIndex(x => x.ClerkUserId)
                    .IsUnique();

                // Email
                u.Property(x => x.Email)
                    .HasMaxLength(150)
                    .IsRequired();

                u.HasIndex(x => x.Email)
                    .IsUnique();


                // Timestamps
                u.Property(x => x.CreatedAt)
                    .IsRequired();

                u.Property(x => x.LastLoginAt);

                // 1:1 Navigation Mappings
                u.HasOne(x => x.UserProfile)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserProfile>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(x => x.UserAvailability)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserAvailability>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(x => x.UserPrivacy)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserPrivacy>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(x => x.UserReputation)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserReputation>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(x => x.UserSkills)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserSkills>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                u.HasOne(x => x.UserNotifications)
                    .WithOne(p => p.User)
                    .HasForeignKey<UserNotificationPreferences>(p => p.UserId)
                    .OnDelete(DeleteBehavior.Cascade);
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
