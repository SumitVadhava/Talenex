using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.DTOs.UpdateDtos
{
    public class UpsertUserFavouritesDto
    {
        public Guid FavId { get; set; }
        public bool IsAdd { get; set; }
    }
}
