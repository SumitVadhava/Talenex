using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Talenex.Domain.ValueObjects
{
    public class SkillOfferedObj
    {

        public SkillOfferedObj() { }

        [JsonPropertyName("title")]
        public string? Title { get; set; }

        [JsonPropertyName("category")]

        public string ?Category { get; set; }

        [JsonPropertyName("level")]

        public string ?Level { get; set; }

        [JsonPropertyName("description")]

        public string ?Description { get; set; }

        [JsonPropertyName("certificateURL")]

        public string ?CertificateURL { get; set; }

    }
}
