using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Talenex.Domain.ValueObjects
{
    public class SkillWantsObj
    {
        public SkillWantsObj() { }

        [JsonPropertyName("name")]
        public string ?Name { get; set; }

        [JsonPropertyName("level")]
        public string ?Level { get; set; }
    }
}
