using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Talenex.Application.DTOs.ResponseDtos;
using Talenex.Application.IRepository;


namespace Talenex.infrastructure.Services
{
    public class ClerkService : IClerkService
    {
        private readonly HttpClient _httpClient;
        private readonly string _secretKey;

        public ClerkService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _secretKey = config["Clerk:SecretKey"];
        }

        public async Task<ClerkUserDto> GetUserAsync(string clerkUserId)
        {
            var request = new HttpRequestMessage(
                HttpMethod.Get,
                $"https://api.clerk.com/v1/users/{clerkUserId}"
            );

            request.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", _secretKey);

            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<ClerkUserDto>(json)!;
        }
        public async Task DeleterUserAsync(string clerkUserId)
        {

            var request = new HttpRequestMessage(
                HttpMethod.Delete,
                $"https://api.clerk.com/v1/users/{clerkUserId}"
            );

            request.Headers.Authorization =
                new AuthenticationHeaderValue("Bearer", _secretKey);

            var response = await _httpClient.SendAsync(request);
            
            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"[ClerkService] Delete failed for {clerkUserId}. Status: {response.StatusCode}, Error: {error}");
            }
        }
    }
}