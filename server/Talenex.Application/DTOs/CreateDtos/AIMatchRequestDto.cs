using System.Collections.Generic;

namespace Talenex.Application.DTOs.CreateDtos
{
    public class AIMatchRequestDto
    {
        public List<string> RequiredSkills { get; set; } = new();
        public int TopN { get; set; } = 5;
    }
}
