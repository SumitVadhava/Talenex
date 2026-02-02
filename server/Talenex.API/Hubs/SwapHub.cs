using Microsoft.AspNetCore.SignalR;

namespace Talenex.API.Hubs
{
    public class SwapHub : Hub
    {
        public async Task JoinUserGroup(string userId)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userId);
            Console.WriteLine($"[SignalR] Connection {Context.ConnectionId} joined group: {userId}");
        }
    }
}