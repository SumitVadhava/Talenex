using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpdateUserFavouritesDto
    {
        public Guid Id { get; set; }   
        public List<Guid> FavIds { get; set; } = new();
    }
}