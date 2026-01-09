using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.CreateDtos
{
    public  class CreateUserProfileDto
    {
        //[Required]
        public Guid UserId { get; set; }

        //[Required]
        public string FullName { get; set; }

        //[Required]
        public string Username { get; set; }

        public string Bio { get; set; }

        public string ProfilePhotoUrl { get; set; }

        public string Location { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
    }
}
