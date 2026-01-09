using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class ClerkUserDto
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("created_at")]
        public long Created_At { get; set; }

        [JsonPropertyName("last_sign_in_at")]
        public long? Last_Sign_In_At { get; set; }
    }
}
