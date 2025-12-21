using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserSkillsRepository  : Repository<UserSkills>
    {
         public UserSkillsRepository(AppDBContext db) : base(db) { }

        
    }
}