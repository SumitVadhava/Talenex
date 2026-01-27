using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.Domain.ValueObjects;
using Talenex.infrastructure.Data;
using Talenex.infrastructure.Repositories;

namespace Talenex.infrastructure.Services
{   
    public class OnboardingService : IOnboardingService
    {
        private readonly AppDBContext _dbContext;
        private readonly IRepository<UserProfile> _profileRepository;
        private readonly IRepository<UserSkills> _skillRepository;
        private readonly IRepository<UserAvailability> _availabilityRepository;
        private readonly IRepository<UserNotificationPreferences> _notificationRepository;
        private readonly IRepository<UserPrivacy> _privacyRepository;
        private readonly IRepository<UserReputation> _reputationRepository;

        public OnboardingService(AppDBContext dbContext,
            IRepository<UserProfile> profileRepository,
            IRepository<UserSkills> skillRepository,
            IRepository<UserAvailability> availabilityRepository,
            IRepository<UserNotificationPreferences> notificationRepository,
            IRepository<UserPrivacy> privacyRepository,
            IRepository<UserReputation> reputationRepository)
        {
            _dbContext = dbContext;
            _profileRepository = profileRepository;
            _skillRepository = skillRepository;
            _availabilityRepository = availabilityRepository;
            _notificationRepository = notificationRepository;
            _privacyRepository = privacyRepository;
            _reputationRepository = reputationRepository;

        }

        public async Task CompleteOnboardingAsync(Guid userId, OnBoardingDto dto)
        {
            if (dto == null)
                throw new Exception("Onboarding DTO is null");

            if (dto.Profile == null)
                throw new Exception("Profile section is missing");

            if (dto.Skills == null)
                throw new Exception("Skills section is missing");

            var existingProfile = await _dbContext.UserProfiles.FirstOrDefaultAsync(x => x.UserId == userId);
            
            if (existingProfile != null)
                throw new Exception("Onboarding already completed");

            
            var profile = new UserProfile
            {
                UserId = userId,
                FullName = dto.Profile.FullName,
                Username = dto.Profile.Username,
                Bio = dto.Profile.Bio,
                ProfilePhotoUrl = dto.Profile.ProfilePhotoUrl,
                Location = dto.Profile.Location,
                Latitude = dto.Profile.Latitude,
                Longitude = dto.Profile.Longitude,
            };

            await _profileRepository.AddAsync(profile);

            var userSkills = new UserSkills
            {
                UserId = userId,
                SkillsOffered = dto.Skills.SkillsOffered ?? new List<SkillOfferedObj>(),
                SkillsWanted = dto.Skills.SkillsWanted ?? new List<SkillWantsObj>()
            };

            await _skillRepository.AddAsync(userSkills);


            var userAvailability = new UserAvailability
            {
                UserId = userId,
                AvailableOnWeekdays = true,
                AvailableOnWeekends = true,
                PreferredSessionDuration = 0,
                PreferredSessionMode = "Online"
            };

            await _availabilityRepository.AddAsync(userAvailability);


          
            var userNotificationPreferences = new UserNotificationPreferences
            {
                  UserId = userId,
                  NotifyOnMessage = true,
                  NotifyOnSwapRequest = true,
                  NotifyOnRatingReceived = true
            };

            await _notificationRepository.AddAsync(userNotificationPreferences);


            var userPrivacy = new UserPrivacy
            {
                UserId = userId,
                IsProfilePublic = true,
                ShowLocation = true,
                ShowSkills = true,
                AllowMessagesFrom = "everyone"
            };

            await _privacyRepository.AddAsync(userPrivacy);


            var userReputation = new UserReputation
            {
                UserId = userId,
                AverageRating = 0,
                TotalReviews = 0,
                TrustScore = 0,
                BadgesJson = new List<string>().ToString()
            };

            await _reputationRepository.AddAsync(userReputation);

        }

    }
}