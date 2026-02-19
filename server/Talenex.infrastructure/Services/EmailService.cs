using Application.DTOs;
using Application.IRepository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Http;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using Talenex.Application.DTOs.ResponseDtos;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public EmailService(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }

        public async Task SendSwapRequestEmailAsync(SwapRequestEmailDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.PartnerEmail))
                throw new Exception("Partner email is required");

            var scriptUrl = "https://script.google.com/macros/s/AKfycbykpuhZuv2zlwdxK0I0iqj-AAw2i1k-sb2c1d6Wp0712VE_A1KocZt2MWH3d1evQbn-2A/exec";
            
            Console.WriteLine($"[EmailService] Sending email to {dto.PartnerEmail} via Google Apps Script Proxy...");

            var payload = new
            {
                to = dto.PartnerEmail.Trim(),
                subject = "New Skill Swap Request",
                body = BuildEmailBody(dto)
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = _httpClientFactory.CreateClient();
            try
            {
                var response = await client.PostAsync(scriptUrl, content);
                
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[EmailService] Proxy Response: {result}");
                    Console.WriteLine("[EmailService] Email sent successfully via Proxy!");
                }
                else
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[EmailService] Proxy Error: {response.StatusCode} - {error}");
                    throw new Exception($"Email proxy failed: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[EmailService] Critical failure calling email proxy: {ex.Message}");
                throw;
            }
        }


        private string TruncateMessage(string message, int maxChars = 220)
        {
            if (string.IsNullOrWhiteSpace(message))
                return "No personal message provided.";

            message = WebUtility.HtmlEncode(message);

            if (message.Length <= maxChars)
                return message.Replace("\n", "<br/>");

            return message.Substring(0, maxChars) + "...";
        }

        private string BuildEmailBody(SwapRequestEmailDto dto)
        {
            var personalMessage = TruncateMessage(dto.PersonalMessage);

            return $@"
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset=""UTF-8"" />
            <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
            <title>Talenex Swap Request</title>
            </head>

            <body style=""margin:0;padding:0;background-color:#f3f4f6;
            font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;"">

            <table width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""padding:20px;"">
            <tr>
            <td align=""center"">

            <table width=""100%"" cellpadding=""0"" cellspacing=""0""
            style=""max-width:600px;background:#ffffff;border-radius:12px;padding:24px;"">

            <!-- Header -->
            <tr>
            <td style=""font-size:22px;font-weight:700;color:#111827;padding-bottom:20px;"">
            🤝 New Skill Swap Request
            </td>
            </tr>

            <!-- Swap Section -->
            <tr>
            <td>
            <table width=""100%"" cellpadding=""0"" cellspacing=""0""
            style=""border:1px solid #e5e7eb;border-radius:10px;padding:16px;"">

            <tr>
            <td align=""center"" width=""40%"">
            <img src=""{dto.PartnerImageUrl}"" width=""56"" height=""56""
            style=""border-radius:50%;display:block;margin-bottom:6px;"" />
            <div style=""font-size:12px;color:#6b7280;"">You</div>
            <div style=""font-weight:600;font-size:14px;"">{dto.PartnerSkill}</div>
            </td>

            <td align=""center"" width=""20%"" style=""font-size:26px;color:#2563eb;"">
            ⇄
            </td>

            <td align=""center"" width=""40%"">
            <img src=""{dto.YourImageUrl}"" width=""56"" height=""56""
            style=""border-radius:50%;display:block;margin-bottom:6px;"" />
            <div style=""font-size:12px;color:#6b7280;"">Partner</div>
            <div style=""font-weight:600;font-size:14px;"">{dto.YourSkill}</div>
            </td>
            </tr>

            </table>
            </td>
            </tr>

            <!-- Details -->
            <tr>
            <td style=""padding-top:24px;"">
            <table width=""100%"" cellpadding=""0"" cellspacing=""0"">

            <tr>
            <td style=""padding-bottom:20px;"">
            <div style=""font-size:16px;font-weight:600;margin-bottom:8px;"">
            📅 Proposed Schedule
            </div>

            <strong>Date & Time:</strong><br/>
            {dto.ScheduleDateTime}<br/><br/>

            <strong>Format:</strong><br/>
            Online via Video Call<br/><br/>

            <strong>Duration:</strong><br/>
            {dto.DurationMinutes} Minutes
            </td>
            </tr>

            <tr>
            <td>
            <div style=""font-size:16px;font-weight:600;margin-bottom:8px;"">
                Personal Message
            </div>

            <div style=""border:1px solid #e5e7eb;background:#f9fafb;
            border-radius:8px;padding:14px;font-size:14px;
            line-height:1.6;color:#111827;"">
            {dto.PersonalMessage}
            </div>
            </td>
            </tr>

            </table>
            </td>
            </tr>

            <!-- CTA -->
            <tr>
            <td align=""center"" style=""padding-top:28px;"">
            <a href=""https://talenex.vercel.app/my-swaps""
            style=""display:inline-block;background:#2563eb;color:#ffffff;
            padding:14px 26px;border-radius:8px;text-decoration:none;
            font-weight:600;font-size:15px;"">
            View Swap Request
            </a>
            </td>
            </tr>

            <!-- Footer -->
            <tr>
            <td style=""padding-top:24px;font-size:12px;color:#6b7280;text-align:center;"">
            You received this email because someone wants to swap skills with you on Talenex.
            </td>
            </tr>

            </table>

            </td>
            </tr>
            </table>

            </body>
            </html>";
        }


        public async Task SendContactEmailAsync(ContactEmailDto emaildto)
        {
            if (string.IsNullOrWhiteSpace(emaildto.Email))
                throw new Exception("User email is required");

            var scriptUrl = "https://script.google.com/macros/s/AKfycbykpuhZuv2zlwdxK0I0iqj-AAw2i1k-sb2c1d6Wp0712VE_A1KocZt2MWH3d1evQbn-2A/exec";


            var payload = new
            {
                to = "talenexcommunity@gmail.com",
                subject = "New User Inquiry ",
                body = BuildContactEmailBody(emaildto)
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = _httpClientFactory.CreateClient();
            try
            {
                var response = await client.PostAsync(scriptUrl, content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[EmailService] Proxy Response: {result}");
                    Console.WriteLine("[EmailService] Email sent successfully via Proxy!");
                }
                else
                {
                    var error = await response.Content.ReadAsStringAsync();
                    Console.WriteLine($"[EmailService] Proxy Error: {response.StatusCode} - {error}");
                    throw new Exception($"Email proxy failed: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[EmailService] Critical failure calling email proxy: {ex.Message}");
                throw;
            }
        }

        private string BuildContactEmailBody(ContactEmailDto emaildto)
        {
            var Message = TruncateMessage(emaildto.Message);
            var Created = emaildto.Created ?? DateTime.UtcNow.AddHours(5).AddMinutes(30);

            return $@"
<!DOCTYPE html>
<html lang=""en"">
<head>
    <meta charset=""UTF-8"">
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
    <title>Business Inquiry - Contact Form Submission</title>
    <style>
        @media only screen and (max-width: 600px) {{
            .content-wrapper {{ width: 100% !important; }}
            .mobile-padding {{ padding: 20px !important; }}
            .mobile-text {{ font-size: 14px !important; }}
            .mobile-heading {{ font-size: 20px !important; }}
            .mobile-stack {{ display: block !important; width: 100% !important; }}
            .mobile-button {{ padding: 14px 24px !important; font-size: 14px !important; }}
        }}
    </style>
</head>
<body style=""margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;"">
    <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"" style=""background-color: #f5f5f5;"">
        <tr>
            <td style=""padding: 30px 15px;"">
                <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""600"" class=""content-wrapper"" style=""margin: 0 auto; background-color: #ffffff; max-width: 600px;"">
                    
                    <!-- Header -->
                    <tr>
                        <td style=""background-color: #000000; padding: 0;"">
                            <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"">
                                <tr>
                                    <td class=""mobile-padding"" style=""padding: 35px 40px;"">
                                        <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"">
                                            <tr>
                                                <td style=""vertical-align: middle;"">
                                                    <h1 class=""mobile-heading"" style=""margin: 0; color: #ffffff; font-size: 26px; font-weight: 600; letter-spacing: -0.5px; line-height: 1.2;"">New User Inquiry</h1>
                                                </td>
                                                <td style=""text-align: right; vertical-align: middle;"" class=""mobile-stack"">
                                                    <p style=""margin: 0; color: rgba(255,255,255,0.7); font-size: 13px; font-weight: 500;"">{Created}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Contact Details Section -->
                    <tr>
                        <td class=""mobile-padding"" style=""padding: 30px 40px 20px 40px;"">
                            <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"" style=""border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;"">
                                <tr>
                                    <td style=""background-color: #fafafa; padding: 18px 25px; border-bottom: 2px solid #3b82f6;"">
                                        <p style=""margin: 0; color: #000000; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;"">Client Information</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style=""padding: 0;"">
                                        <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"">
                                            <!-- Name Row -->
                                            <tr>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px; border-bottom: 1px solid #f0f0f0; width: 35%; vertical-align: top;"">
                                                    <p style=""margin: 0; color: #666666; font-size: 13px; font-weight: 600;"">Full Name</p>
                                                </td>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px; border-bottom: 1px solid #f0f0f0; width: 65%;"">
                                                    <p class=""mobile-text"" style=""margin: 0; color: #000000; font-size: 15px; font-weight: 600;"">{emaildto.Name}</p>
                                                </td>
                                            </tr>
                                            <!-- Email Row -->
                                            <tr>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px; border-bottom: 1px solid #f0f0f0; vertical-align: top;"">
                                                    <p style=""margin: 0; color: #666666; font-size: 13px; font-weight: 600;"">Email Address</p>
                                                </td>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px; border-bottom: 1px solid #f0f0f0;"">
                                                    <p class=""mobile-text"" style=""margin: 0; color: #000000; font-size: 15px; font-weight: 500; word-break: break-all;"">
                                                        <a href=""mailto:{emaildto.Email}"" style=""color: #3b82f6; text-decoration: none; font-weight: 600;"">{emaildto.Email}</a>
                                                    </p>
                                                </td>
                                            </tr>
                                            <!-- Subject Row -->
                                            <tr>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px; vertical-align: top;"">
                                                    <p style=""margin: 0; color: #666666; font-size: 13px; font-weight: 600;"">Subject</p>
                                                </td>
                                                <td class=""mobile-stack"" style=""padding: 18px 25px;"">
                                                    <p class=""mobile-text"" style=""margin: 0; color: #000000; font-size: 15px; font-weight: 600;"">{emaildto.Subject}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Message Section -->
                    <tr>
                        <td class=""mobile-padding"" style=""padding: 25px 40px;"">
                            <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"" style=""border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;"">
                                <tr>
                                    <td style=""background-color: #fafafa; padding: 18px 25px; border-bottom: 2px solid #000000;"">
                                        <p style=""margin: 0; color: #000000; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;"">Message Details</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style=""padding: 25px; background-color: #ffffff;"">
                                        <p class=""mobile-text"" style=""margin: 0; color: #333333; font-size: 15px; line-height: 1.7; white-space: pre-wrap;"">{Message}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Action Button -->
                    <tr>
                        <td class=""mobile-padding"" style=""padding: 10px 40px 35px 40px; text-align: center;"">
                            <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""margin: 0 auto;"">
                                <tr>
                                    <td style=""background-color: #000000; border-radius: 6px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);"">
                                        <a href=""mailto:{emaildto.Email}"" class=""mobile-button"" style=""display: block; padding: 16px 45px; color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; letter-spacing: 0.5px;"">
                                            Reply to Client
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td class=""mobile-padding"" style=""padding: 25px 40px; background-color: #fafafa; border-top: 1px solid #e5e5e5;"">
                            <table role=""presentation"" cellspacing=""0"" cellpadding=""0"" border=""0"" width=""100%"">
                                <tr>
                                    <td style=""text-align: center;"">
                                        <p style=""margin: 0 0 8px; color: #666666; font-size: 13px; line-height: 1.6;"">
                                            <strong style=""color: #000000;"">Professional Response Required</strong><br>
                                            Please respond to this inquiry within 24 business hours.
                                        </p>
                                        <p style=""margin: 8px 0 0 0; color: #999999; font-size: 11px;"">
                                            Automated notification from your website contact system
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>";
        }

        public async Task SendFeedBackEmailAsync(FeedbackResponseDto feedbackDto)
        {
            if (string.IsNullOrWhiteSpace(feedbackDto.UserEmail))
                throw new Exception("User email is required");

            var scriptUrl = "https://script.google.com/macros/s/AKfycbykpuhZuv2zlwdxK0I0iqj-AAw2i1k-sb2c1d6Wp0712VE_A1KocZt2MWH3d1evQbn-2A/exec";

            var payload = new
            {
                to = feedbackDto.UserEmail, // send to user
                subject = "Thanks for your feedback on Talenex ❤️",
                body = BuildFeedbackEmailBody(feedbackDto)
            };

            var json = JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            using var client = _httpClientFactory.CreateClient();

            try
            {
                var response = await client.PostAsync(scriptUrl, content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Email proxy failed: {response.StatusCode} - {error}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[EmailService] Failed to send email: {ex.Message}");
                throw;
            }
        }

        private static string RenderStars(int rating)
        {
            rating = Math.Clamp(rating, 0, 5);

            var filledStar = "<span style=\"color:#F5C518;font-size:18px;line-height:1;\">★</span>";
            var emptyStar = "<span style=\"color:#E4E4E7;font-size:18px;line-height:1;\">★</span>";

            return string.Concat(Enumerable.Repeat(filledStar, rating)) +
                   string.Concat(Enumerable.Repeat(emptyStar, 5 - rating));
        }

        private static string RenderRow(string title, string starsHtml)
        {
            return $@"
<tr>
  <td style=""padding:11px 0;border-bottom:1px solid #F4F4F5;font-size:13.5px;color:#18181B;font-weight:500;"">{title}</td>
  <td align=""right"" style=""padding:11px 0;border-bottom:1px solid #F4F4F5;white-space:nowrap;"">
    {starsHtml}
  </td>
</tr>";
        }

        private static string HtmlSafe(string input)
        {
            return System.Net.WebUtility.HtmlEncode(input ?? string.Empty);
        }


        private string BuildFeedbackEmailBody(FeedbackResponseDto feedbackDto)
        {
            var overallStars = RenderStars(feedbackDto.OverallExperience);
            var uiuxStars = RenderStars(feedbackDto.UiUxDesign);
            var speedStars = RenderStars(feedbackDto.ApplicationSpeed);
            var skillsStars = RenderStars(feedbackDto.SkillsMatchingAccuracy);
            var searchStars = RenderStars(feedbackDto.SearchAndFiltersEffectiveness);
            var trustStars = RenderStars(feedbackDto.CommunityTrust);
            var navStars = RenderStars(feedbackDto.EaseOfNavigation);
            var featureStars = RenderStars(feedbackDto.FeatureUsefulness);
            var supportStars = RenderStars(feedbackDto.HelpAndSupportQuality);

            var userName = HtmlSafe(feedbackDto.UserName);
            var message = HtmlSafe(feedbackDto.Message);
            var dateStr = feedbackDto.Created ?? DateTime.UtcNow.AddHours(5).AddMinutes(30);
            return $@"
        <!DOCTYPE html>
        <html lang=""en"">
        <head>
        <meta charset=""UTF-8"" />
        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0""/>
        <title>Thank you for your feedback!</title>
        </head>
        <body style=""margin:0;padding:0;background-color:#f7f7f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;"">

        <table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""padding:44px 16px;"">
        <tr><td align=""center"">

        <table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""max-width:540px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.07);"">

        <tr><td style=""background:#111;height:4px;""></td></tr>

        <tr>
        <td style=""padding:40px 44px 36px;"">
        <p style=""margin:0 0 8px;font-size:28px;font-weight:600;color:#09090B;"">We got your feedback! 😊</p>
        <p style=""margin-top:20px;font-size:15px;color:#52525B;"">
        Hey <strong>{userName}</strong>, thanks for taking the time on <strong>{dateStr}</strong>.
        Your input goes straight to our team and helps us build a better product for everyone.
        </p>
        </td>
        </tr>

        <tr><td style=""padding:0 44px;""><div style=""height:1px;background:#F4F4F5;""></div></td></tr>

        <tr>
        <td style=""padding:32px 44px 8px;"">
        <p style=""font-size:11px;font-weight:700;color:#A1A1AA;text-transform:uppercase;"">Your ratings</p>

        <table width=""100%"" cellpadding=""0"" cellspacing=""0"">
        {RenderRow("Overall Experience", overallStars)}
        {RenderRow("UI / UX Design", uiuxStars)}
        {RenderRow("Application Speed", speedStars)}
        {RenderRow("Skills Matching", skillsStars)}
        {RenderRow("Search & Filters", searchStars)}
        {RenderRow("Community Trust", trustStars)}
        {RenderRow("Ease of Navigation", navStars)}
        {RenderRow("Feature Usefulness", featureStars)}
        {RenderRow("Help & Support", supportStars)}
        </table>
        </td>
        </tr>

        <tr><td style=""padding:8px 44px 0;""><div style=""height:1px;background:#F4F4F5;""></div></td></tr>

        <tr>
        <td style=""padding:32px 44px 8px;"">
        <p style=""font-size:11px;font-weight:700;color:#A1A1AA;text-transform:uppercase;"">Your message</p>
        <div style=""background:#FAFAFA;border:1.5px solid #E4E4E7;border-radius:12px;padding:18px 20px;"">
        <p style=""margin:0;font-size:14px;color:#18181B;line-height:1.65;"">{message}</p>
        </div>
        </td>
        </tr>

        <tr>
        <td style=""padding:28px 44px 40px;"">
        <div style=""background:#F7F7F8;border-radius:12px;padding:20px 24px;"">
        <p style=""margin:0;font-size:14px;color:#09090B;font-weight:600;"">Thanks again for helping us improve! ✨</p>
        <p style=""margin:0;font-size:13px;color:#71717A;"">— Team Talenex</p>
        </div>
        </td>
        </tr>

        </table>

        </td></tr>
        </table>

        </body>
        </html>";
        }

    }
}