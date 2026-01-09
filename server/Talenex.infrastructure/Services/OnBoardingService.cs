using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.DTOs.CreateDtos;
using Talenex.Application.IRepository;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Repositories;

namespace Talenex.infrastructure.Services
{
    public class OnboardingService : IOnboardingService
    {
        private readonly IRepository<UserProfile> _profileRepository;
        private readonly IRepository<UserSkills> _skillRepository;

        public OnboardingService(
            IRepository<UserProfile> profileRepository,
            IRepository<UserSkills> skillRepository)
        {
            _profileRepository = profileRepository;
            _skillRepository = skillRepository;
        }

        public async Task CompleteOnboardingAsync(Guid userId, OnBoardingDto dto)
        {
            var exists = await _profileRepository.GetByIdAsync(userId);
            if (exists != null)
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

            var Skills = new UserSkills
            {
                UserId = userId,
                SkillsOffered = dto.Skills.SkillsOffered,
                SkillsWanted = dto.Skills.SkillsWanted
            };

            await _skillRepository.AddAsync(Skills);

        }
    }


}
