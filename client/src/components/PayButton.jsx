// import axios from "axios";

// function PayButton() {
//   const handlePayment = async () => {
//     // 1. Create order from backend
//     // const orderRes = await axios.post("https://localhost:5001/api/payment/create-order", {
//     //   amount: 500 // ₹500
//     // });

//     // const { orderId, amount, key } = orderRes.data;

//     // 2. Configure Razorpay options
//     const options = {
//       key: key,
//       amount: amount * 100,
//       currency: "INR",
//       name: "Talenex",
//       description: "Premium Subscription",
//       order_id: orderId,
//       handler: async function (response) {
//         // 3. Verify payment
//         const verifyRes = await axios.post("https://localhost:5001/api/payment/verify", {
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_signature: response.razorpay_signature
//         });

//         if (verifyRes.data.status === "success") {
//           alert("Payment Successful ✅");
//         } else {
//           alert("Payment Failed ❌");
//         }
//       },
//       prefill: {
//         name: "Sumit",
//         email: "sumit@example.com",
//         contact: "9999999999"
//       },
//       theme: {
//         color: "#3399cc"
//       }
//     };

//     // 4. Open Razorpay Checkout
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return <button onClick={handlePayment}>Pay Now</button>;
// }

// export default PayButton;



function PayButtonTest() {
  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // Your TEST Key ID (safe to expose)
      amount: 500 * 100, // ₹500 in paise
      currency: "INR",
      handler: function (response) {    
        console.log("Payment Success:", response);
        alert("Payment Success (Frontend Test Only) ✅\nPaymentId: " + response.razorpay_payment_id);
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}></button>;
}

export default PayButtonTest;