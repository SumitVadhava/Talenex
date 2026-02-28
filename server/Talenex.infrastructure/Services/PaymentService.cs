using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Talenex.Application.IRepository;
using Talenex.Domain.Common.Enums;
using RazorPayment = Razorpay.Api.Payment;
using DomainPayment = Talenex.Domain.Entities.Payment;

namespace Talenex.infrastructure.Services
{
    public class PaymentService : GenericService<DomainPayment>, IPaymentService
    {
        private readonly IConfiguration _config;
        private readonly string _keyId;
        private readonly string _keySecret;

        public PaymentService(IRepository<DomainPayment> repository, IConfiguration config) : base(repository)
        {
            _config = config;
            _keyId = _config["Razorpay:Key"] ?? "";
            _keySecret = _config["Razorpay:Secret"] ?? "";
        }

        public async Task<string> CreateOrderAsync(int amount, string currency)
        {
            RazorpayClient client = new RazorpayClient(_keyId, _keySecret);

            Dictionary<string, object> options = new Dictionary<string, object>();

            options.Add("amount", amount * 100);
            options.Add("currency", currency);
            options.Add("receipt", Guid.NewGuid().ToString());

            Order order = client.Order.Create(options);

            return order["id"].ToString();
        }

        public bool VerifyPayment(string orderId, string paymentId, string signature)
        {
            try
            {
                if (string.IsNullOrEmpty(orderId) || string.IsNullOrEmpty(paymentId) || string.IsNullOrEmpty(signature))
                    throw new ArgumentException("Missing required payment verification data.");

                string payload = orderId + "|" + paymentId;
                string secret = _keySecret;

                using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret)))
                {
                    byte[] hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(payload));
                    StringBuilder sb = new StringBuilder();
                    foreach (byte b in hash)
                    {
                        sb.Append(b.ToString("x2"));
                    }
                    string generatedSignature = sb.ToString();

                    if (generatedSignature != signature)
                    {
                        throw new Exception($"Signature mismatch. Generated: {generatedSignature}, Received: {signature}");
                    }
                }

                return true;
            }
            catch (Exception ex)
            {
                // Re-throw to be captured by the controller
                throw new Exception("Payment verification failed: " + ex.Message);
            }
        }
    }
}
