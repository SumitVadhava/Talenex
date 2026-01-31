using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Talenex.Application.IRepository;

public class ZegoTokenService : IZegoTokenService
{
    private readonly IConfiguration _config;

    public ZegoTokenService(IConfiguration config)
    {
        _config = config;
    }

    public string GenerateToken(string userId, int expireSeconds = 3600)
    {
        long appId = long.Parse(_config["ZegoCloud:AppId"]!);
        string serverSecret = _config["ZegoCloud:ServerSecret"]!;

        long currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        long expireTime = currentTime + expireSeconds;
        long nonce = RandomNumberGenerator.GetInt32(100000);

        var payload = new
        {
            app_id = appId,
            user_id = userId,
            nonce = nonce,
            ctime = currentTime,
            expire = expireSeconds
        };

        string payloadJson = JsonSerializer.Serialize(payload);
        string payloadBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(payloadJson));

        using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(serverSecret));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payloadBase64));
        string signature = Convert.ToBase64String(hash);

        return $"{payloadBase64}.{signature}";
    }
}
