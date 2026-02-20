using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.IRepository
{
    public interface IChatService
    {
        string GenerateStreamToken(string userId);
        Task UpsertStreamUserAsync(string userId, string fullName, string profilePic);
    }
}
