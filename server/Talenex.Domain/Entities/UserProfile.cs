using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Talenex.Domain.Entities
{
    public class UserProfile : IEntity
    {
        public Guid Id { get; set; }

        [ForeignKey("User")]
        public Guid UserId { get; set; }

        public User User { get; set; }

        [Required]
        public string FullName {  get; set; }

        [Required]
        public string Username { get; set; }


        public string Bio {get; set; }

        public string? ProfilePhotoUrl { get; set; }

        public string Location { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
    }
}
