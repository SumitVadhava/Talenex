using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StreamChat.Clients;
using StreamChat.Models;
using Talenex.Application.IRepository;

namespace Talenex.infrastructure.Services
{
    public class ChatService : IChatService
    {
        private readonly IUserClient _userClient;

        public ChatService(IConfiguration configuration)
        {
            var apiKey = configuration["Stream:ApiKey"];
            var apiSecret = configuration["Stream:ApiSecret"];

            if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
            {
                throw new System.Exception("Stream API Key or Secret is missing in configuration.");
            }

            var factory = new StreamClientFactory(apiKey, apiSecret);
            _userClient = factory.GetUserClient();
        }

        public string GenerateStreamToken(string userId)
        {
            return _userClient.CreateToken(userId);
        }

        public async Task UpsertStreamUserAsync(string userId, string fullName, string profilePic)
        {
            var userRequest = new UserRequest { Id = userId };
            userRequest.SetData("name", fullName);
            userRequest.SetData("image", profilePic);

            await _userClient.UpsertAsync(userRequest);
        }
    }
}