// using Application.DTOs;
// using Application.IRepository;
// using Microsoft.Extensions.Configuration;
// using System.Net;
// using System.Net.Mail;

// namespace Infrastructure.Services
// {
//     public class EmailService : IEmailService
//     {
//         private readonly IConfiguration _configuration;

//         public EmailService(IConfiguration configuration)
//         {
//             _configuration = configuration;
//         }

//         public async Task SendSwapRequestEmailAsync(SwapRequestEmailDto dto)
//         {
//             if (string.IsNullOrWhiteSpace(dto.PartnerEmail))
//                 throw new Exception("Partner email is required");

//             var smtpClient = new SmtpClient
//             {
//                 Host = _configuration["Email:SmtpHost"],
//                 Port = int.Parse(_configuration["Email:SmtpPort"]),
//                 EnableSsl = true,
//                 Credentials = new NetworkCredential(
//                     _configuration["Email:Username"],
//                     _configuration["Email:Password"]
//                 )
//             };

//             var mail = new MailMessage
//             {
//                 From = new MailAddress(_configuration["Email:From"], "Talenex"),
//                 Subject = "New Skill Swap Request",
//                 Body = BuildEmailBody(dto),
//                 IsBodyHtml = true
//             };

//             mail.To.Add(new MailAddress(dto.PartnerEmail.Trim()));

//             await smtpClient.SendMailAsync(mail);
//         }


//         private string BuildEmailBody(SwapRequestEmailDto dto)
//         {
//             return $@"
//                 <!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN""
//                   ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
//                 <html xmlns=""http://www.w3.org/1999/xhtml"">
//                 <head>
//                   <meta http-equiv=""Content-Type"" content=""text/html; charset=UTF-8"" />
//                   <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"" />
//                   <title>Talenex Swap Message</title>
//                 </head>

//                 <body style=""margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;"">

//                 <table width=""100%"" cellpadding=""0"" cellspacing=""0"" style=""padding:30px;"">
//                 <tr>
//                 <td align=""center"">

//                 <table width=""600"" cellpadding=""0"" cellspacing=""0"" style=""background:#ffffff;border-radius:10px;padding:24px;"">

//                 <tr>
//                 <td style=""font-size:22px;font-weight:600;color:#111827;padding-bottom:20px;"">
//                 Swap Request
//                 </td>
//                 </tr>

//                 <tr>
//                 <td style=""font-size:18px;font-weight:600;padding-bottom:12px;"">
//                 The Swap
//                 </td>
//                 </tr>

//                 <tr>
//                 <td>
//                 <table width=""100%"" style=""border:2px solid #e5e7eb;border-radius:8px;padding:16px;"">
//                 <tr>

//                 <td align=""center"" width=""40%"">
//                 <img src=""{dto.PartnerImageUrl}"" width=""64"" height=""64"" style=""border-radius:50%;margin-bottom:8px;"" />
//                 <div style=""font-size:13px;color:#6b7280;"">You</div>
//                 <div style=""font-weight:600;"">{dto.PartnerSkill}</div>
//                 </td>

//                 <td align=""center"" width=""20%"" style=""font-size:28px;color:#2563eb;"">
//                 ⇄
//                 </td>

//                 <td align=""center"" width=""40%"">
//                 <img src=""{dto.YourImageUrl}"" width=""64"" height=""64"" style=""border-radius:50%;margin-bottom:8px;"" />
//                 <div style=""font-size:13px;color:#6b7280;"">Partner</div>
//                 <div style=""font-weight:600;"">{dto.YourSkill}</div>
//                 </td>

//                 </tr>
//                 </table>
//                 </td>
//                 </tr>

//                 <tr>
//                 <td style=""padding-top:20px;"">
//                 <table width=""100%"">
//                 <tr>

//                 <td width=""50%"" valign=""top"">
//                 <div style=""font-size:18px;font-weight:600;margin-bottom:10px;"">
//                 Proposed Schedule
//                 </div>

//                 <strong>Date & Time</strong><br/>
//                 {dto.ScheduleDateTime}<br/><br/>

//                 <strong>Format</strong><br/>
//                 Online via Video Call<br/><br/>

//                 <strong>Estimated Duration</strong><br/>
//                 {dto.DurationMinutes} Minutes
//                 </td>

//                 <td width=""50%"" valign=""top"">
//                 <div style=""font-size:18px;font-weight:600;margin-bottom:10px;"">
//                 Personal Message
//                 </div>

//                 <div style=""border:2px solid #e5e7eb;background:#f9fafb;border-radius:6px;padding:12px;font-size:14px;"">
//                 {dto.PersonalMessage}
//                 </div>
//                 </td>

//                 </tr>
//                 </table>
//                 </td>
//                 </tr>

//                 <tr>
//                 <td align=""center"" style=""padding-top:24px;"">
//                 <a href=""https://talenex.com/u/swap-request""
//                 style=""background:#2563eb;color:#ffffff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;"">
//                 View Swap Request
//                 </a>
//                 </td>
//                 </tr>

//                 </table>

//                 </td>
//                 </tr>
//                 </table>

//                 </body>
//                 </html>";
//         }

//     }
// }  


using Application.DTOs;
using Application.IRepository;
using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendSwapRequestEmailAsync(SwapRequestEmailDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.PartnerEmail))
                throw new Exception("Partner email is required");

            var smtpClient = new SmtpClient
            {
                Host = _configuration["Email:SmtpHost"],
                Port = int.Parse(_configuration["Email:SmtpPort"]),
                EnableSsl = true,
                Credentials = new NetworkCredential(
                    _configuration["Email:Username"],
                    _configuration["Email:Password"]
                )
            };

            var mail = new MailMessage
            {
                From = new MailAddress(_configuration["Email:From"], "Talenex"),
                Subject = "New Skill Swap Request",
                Body = BuildEmailBody(dto),
                IsBodyHtml = true
            };

            mail.To.Add(dto.PartnerEmail.Trim());

            await smtpClient.SendMailAsync(mail);
        }

        // ==============================
        // Helpers
        // ==============================

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
            <a href=""https://talenex.com/u/swap-request""
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
    }
}