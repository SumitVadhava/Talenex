using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Talenex.Domain.Entities;
using Talenex.infrastructure.Data;

namespace Talenex.infrastructure.Repositories
{
    public class UserNotificationPreferencesRepository  : Repository<UserNotificationPreferences>
    {
         public UserNotificationPreferencesRepository(AppDBContext db) : base(db) { }

        //public override async Task<UserNotificationPreferences> UpdateAsync(UserNotificationPreferences entity)
        //{
        //    var existing = await _table.FindAsync(entity.Id);
        //    if (existing == null)
        //        throw new Exception("User not found");

        //    existing.NotifyOnMessage = entity.NotifyOnMessage;
        //    existing.NotifyOnSwapRequest = entity.NotifyOnSwapRequest;
        //    existing.NotifyOnRatingReceived = entity.NotifyOnRatingReceived;
            
        //    await _db.SaveChangesAsync();
        //    return existing;
        //}
    }
}