using Microsoft.Extensions.Configuration;
using Razorpay.Api;
using System;
using System.Collections.Generic;
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

        public async Task<string> CreateOrderAsync(int amount)
        {
            RazorpayClient client = new RazorpayClient(_keyId, _keySecret);

            Dictionary<string, object> options = new Dictionary<string, object>();

            options.Add("amount", amount * 100);
            options.Add("currency", "INR");
            options.Add("receipt", Guid.NewGuid().ToString());

            Order order = client.Order.Create(options);

            return order["id"].ToString();
        }

        public bool VerifyPayment(string orderId, string paymentId, string signature)
        {
            try
            {
                RazorpayClient client = new RazorpayClient(_keyId, _keySecret);

                Dictionary<string, string> attributes = new Dictionary<string, string>();

                attributes.Add("razorpay_order_id", orderId);
                attributes.Add("razorpay_payment_id", paymentId);
                attributes.Add("razorpay_signature", signature);

                Utils.verifyPaymentSignature(attributes);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
