using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.ResponseDtos
{
    public class UserFavouritesDto
    {
        public Guid Id { get; set; }
        public List<Guid> FavIds { get; set; } = new();
    }
}