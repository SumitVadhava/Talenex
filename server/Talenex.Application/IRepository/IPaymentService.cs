using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Talenex.Application.IRepository
{
    public interface IPaymentService : IService<Talenex.Domain.Entities.Payment>
    {
        Task<string> CreateOrderAsync(int amount);
        bool VerifyPayment(string orderId, string paymentId, string signature);
    }
}
